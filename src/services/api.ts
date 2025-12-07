import { API_BASE_URL } from "../constants";
import type {
  AuthResponse,
  FilterState,
  SalesResponse,
  SortProps,
} from "../types";

class ApiService {
  private token: string | null = null;

  setToken = (token: string) => {
    this.token = token;
    localStorage.setItem("autobizz_token", token);
  };

  loadToken = (): string | null => {
    this.token = localStorage.getItem("autobizz_token");
    return this.token;
  };

  authorize = async (): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getAuthorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenType: "frontEndTest" }),
      });

      if (!response.ok) throw new Error("Authorization failed");

      const data: AuthResponse = await response.json();
      this.setToken(data.token);
      return data.token;
    } catch (error) {
      console.error("Auth failed", error);
      throw error;
    }
  };

  getSales = async (
    filters: FilterState,
    sort: SortProps,
    cursor?: { type: "before" | "after"; token: string }
  ): Promise<SalesResponse> => {
    if (!this.token) await this.authorize();

    const params = new URLSearchParams();
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.minPrice) params.append("priceMin", filters.minPrice);
    if (filters.email) params.append("email", filters.email);
    if (filters.phone) params.append("phone", filters.phone);

    params.append("sortBy", sort.column);
    params.append("sortOrder", sort.direction);

    // API cursor logic
    if (cursor) {
      params.append(cursor.type, cursor.token);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/sales?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-AUTOBIZZ-TOKEN": this.token || "",
          },
        }
      );

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 500
      ) {
        // Token might be expired, try to refresh once
        const newToken = await this.authorize();
        if (!newToken) throw new Error("Authorization failed");
        return this.getSales(filters, sort, cursor);
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error: ${response.status} - ${errText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request Failed", error);
      throw error;
    }
  };
}

export const api = new ApiService();

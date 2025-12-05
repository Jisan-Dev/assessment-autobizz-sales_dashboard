import { API_BASE_URL } from "../constants";
import type { AuthResponse } from "../types";

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

  // getSales = async()=>{}
}

export const api = new ApiService();

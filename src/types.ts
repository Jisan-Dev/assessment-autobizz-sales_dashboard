export interface FilterState {
  startDate: string;
  endDate: string;
  minPrice: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  expire: number;
}

export interface Sale {
  _id: string;
  date: string;
  price: number;
  customerEmail: string;
  customerPhone: string;
  __v?: number;
}

export interface TotalDailySale {
  day: string;
  totalSale: number;
}

export interface SalesResult {
  totalSales: TotalDailySale[];
  sales: Sale[];
}

export interface SalesResponse {
  results: SalesResult;
  pagination: {
    before: string;
    after: string;
  };
}

export interface SortProps {
  column: "price" | "date";
  direction: "asc" | "desc";
}

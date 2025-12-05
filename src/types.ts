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

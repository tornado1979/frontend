import type { Address } from './address';
import type { ApiResponse } from './api';
export interface AppState {
  success: boolean;
  data: Address[] | null;
  isLoading: boolean;
  error?: string | null;
  message?: string;

  getAddresses: (searchTerm: string) => Promise<ApiResponse<Address[]>>;
}

import type { Address } from './address';

export interface AppState {
  success: boolean;
  addresses: Address[] | null;
  isLoading: boolean;
  error?: string | null;
  message?: string;

  getAddresses: (searchTerm: string) => Promise<void>;
}

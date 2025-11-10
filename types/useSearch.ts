import type { Address } from './address';

export interface UseSearch {
  searchTerm: string | null;
  setSearchTerm: (term: string | null) => void;
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleItemSelect: (item: Address) => void;
  clearInputValue: () => void;
}

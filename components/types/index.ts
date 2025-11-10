import { type ChangeEvent } from 'react';
import type { Address } from '@/types/address';

export type AutocompleteProps = {
  searchTerm: string | null;
  clearInputValue: () => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  handleItemSelect: (item: Address) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  items: Address[];
  renderItem: (item: Address) => React.ReactNode;
  isLoading?: boolean;
};

export type DropdownListProps = {
  items: Address[];
  handleItemSelect: (item: Address) => void;
  renderItem: (item: Address) => React.ReactNode;
};

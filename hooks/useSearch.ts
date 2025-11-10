'use client';
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from '@/store';
import type { UseSearch } from '@/types/useSearch';
import type { Address } from '@/types/address';

export const useSearch = (): UseSearch => {
  const { isLoading, getAddresses } = useAppStore();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);

      if (!value || value.length < 3) {
        setAddresses([]);
        setShowDropdown(false);
        setError(null);
        return;
      }

      try {
        const response = await getAddresses(value);

        if (response.success && response.data) {
          setAddresses(response.data);
          setShowDropdown(true);
          setError(null);
          toast.success(`Found ${response.data.length} addresses`);
        } else {
          setAddresses([]);
          setShowDropdown(false);
          setError(response.error || 'Failed to fetch addresses');
          toast.error(response.error || 'Failed to fetch addresses');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch addresses';
        setAddresses([]);
        setShowDropdown(false);
        setError(errorMessage);
        toast.error(errorMessage);
      }
    },
    [getAddresses]
  );

  const handleItemSelect = useCallback((item: Address) => {
    console.log('item selected:', item);
    setSearchTerm(`${item.street}, ${item.postNumber}, ${item.city}`);
    setShowDropdown(false);
  }, []);

  const clearInputValue = useCallback(() => {
    setSearchTerm(null);
    setAddresses([]);
    setShowDropdown(false);
    setError(null);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    addresses,
    isLoading,
    error,
    showDropdown,
    setShowDropdown,
    handleInputChange,
    handleItemSelect,
    clearInputValue,
  };
};

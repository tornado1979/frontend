import React from 'react';
import { vi } from 'vitest';
import type { Address } from '@/types/address';

export const mockAddresses: Address[] = [
  {
    $tsid: '1',
    city: 'OSLO',
    county: 'Oslo',
    district: 'Grünerløkka',
    municipality: 'Oslo',
    municipalityNumber: 301,
    postNumber: 501,
    street: 'Rodeløkka Postboks 6500-6599',
    type: 'Postboksadresse',
    typeCode: 4,
  },
  {
    $tsid: '2',
    city: 'HALDEN',
    county: 'Østfold',
    district: '',
    municipality: 'Halden',
    municipalityNumber: 101,
    postNumber: 1778,
    street: 'Rodeløkka',
    type: 'Gate-/veg-adresse',
    typeCode: 6,
  },
];

export const createTimeoutError = (message = 'timeout of 10000ms exceeded') => {
  const error = new Error(message) as Error & { code?: string };
  error.code = 'ECONNABORTED';
  return error;
};

export const mockApiResponse = {
  success: (data: unknown, message = 'Success') => ({
    data: {
      success: true,
      data,
      message,
    },
  }),
  error: (error: string, message = 'Error') => ({
    data: {
      success: false,
      error,
      message,
    },
  }),
};

export const defaultProps = {
  searchTerm: null,
  clearInputValue: vi.fn(),
  showDropdown: false,
  setShowDropdown: vi.fn(),
  handleItemSelect: vi.fn(),
  handleInputChange: vi.fn(),
  items: [],
  isLoading: false,
  renderItem: (address: Address) => (
    <div>
      <div>{address.street}</div>
      <div>{address.postNumber}</div>
      <div>{address.city}</div>
    </div>
  ),
};

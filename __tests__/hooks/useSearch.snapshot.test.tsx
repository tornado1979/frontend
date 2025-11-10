import { renderHook } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';
import { act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies
vi.mock('@/store/appStore', () => ({
  useAppStore: () => ({
    isLoading: false,
    getAddresses: vi.fn().mockResolvedValue({ success: true, data: [] }),
  }),
}));

vi.mock('react-hot-toast', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('useSearch Hook Snapshots', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should match snapshot - initial state', () => {
    const { result } = renderHook(() => useSearch());

    expect({
      searchTerm: result.current.searchTerm,
      addresses: result.current.addresses,
      isLoading: result.current.isLoading,
      showDropdown: result.current.showDropdown,
      error: result.current.error,
    }).toMatchSnapshot();
  });

  it('should match snapshot - after search term change', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      const mockEvent = {
        target: { value: 'Oslo' },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleInputChange(mockEvent);
    });

    expect({
      searchTerm: result.current.searchTerm,
      addresses: result.current.addresses,
      isLoading: result.current.isLoading,
      showDropdown: result.current.showDropdown,
      error: result.current.error,
    }).toMatchSnapshot();
  });
});

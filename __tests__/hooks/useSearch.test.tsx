import { renderHook, act } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';
import { useAppStore } from '@/store';
import { toast } from 'react-hot-toast';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mockAddresses } from '../constants';

// Mock the store
vi.mock('@/store', () => ({
  useAppStore: vi.fn(),
}));

const mockUseAppStore = vi.mocked(useAppStore);
const mockToast = vi.mocked(toast);

describe('useSearch Hook', () => {
  const mockGetAddresses = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    mockUseAppStore.mockReturnValue({
      isLoading: false,
      getAddresses: mockGetAddresses,
      addresses: null,
      error: null,
      success: false,
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchTerm).toBeNull();
    expect(result.current.addresses).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.showDropdown).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should update search term and trigger API after debounce', async () => {
    mockGetAddresses.mockResolvedValue({
      success: true,
      data: [{ street: 'Rodeløkka Postboks 6500-6599', city: 'OSLO' }],
    });

    const { result } = renderHook(() => useSearch());

    act(() => {
      const mockEvent = {
        target: { value: 'OSLO' },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleInputChange(mockEvent);
    });

    expect(result.current.searchTerm).toBe('OSLO');

    // Fast-forward past debounce time
    await act(async () => {
      vi.advanceTimersByTime(300);
      await vi.runAllTimersAsync();
    });

    expect(mockGetAddresses).toHaveBeenCalledWith('OSLO');
    expect(result.current.addresses).toHaveLength(1);
    expect(result.current.showDropdown).toBe(true);
  });

  it('should not trigger search for inputs less than 3 characters', async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      const mockEvent = {
        target: { value: 'Os' },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleInputChange(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockGetAddresses).not.toHaveBeenCalled();
    expect(result.current.showDropdown).toBe(false);
  });

  it('should debounce rapid input changes', async () => {
    const { result } = renderHook(() => useSearch(300));

    act(() => {
      const mockEvent1 = {
        target: { value: 'Osl' },
      } as React.ChangeEvent<HTMLInputElement>;
      const mockEvent2 = {
        target: { value: 'Oslo' },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleInputChange(mockEvent1);
      result.current.handleInputChange(mockEvent2);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should only call once with final value
    expect(mockGetAddresses).toHaveBeenCalledTimes(1);
    expect(mockGetAddresses).toHaveBeenCalledWith('Oslo');
  });

  it('should handle API errorsx', async () => {
    mockGetAddresses.mockResolvedValue({
      success: false,
      error: 'Network error',
    });

    const { result } = renderHook(() => useSearch());

    act(() => {
      const mockEvent = {
        target: { value: 'OSLO' },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleInputChange(mockEvent);
    });

    await act(async () => {
      vi.advanceTimersByTime(300);
      await vi.runAllTimersAsync();
    });

    expect(result.current.addresses).toEqual([]);
    expect(result.current.error).toBe('Network error');
    expect(mockToast.error).toHaveBeenCalledWith('Network error');
  });

  it('should handle item selection correctly', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleItemSelect(mockAddresses[0]);
    });

    expect(result.current.searchTerm).toBe(
      'Rodeløkka Postboks 6500-6599, 501, OSLO'
    );
    expect(toast.success).toHaveBeenCalledWith(
      'Selected address: Rodeløkka Postboks 6500-6599, 501, OSLO'
    );
    expect(result.current.showDropdown).toBe(false);
  });
});

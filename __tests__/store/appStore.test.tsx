import { useAppStore } from '@/store';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/apis';
import {
  mockAddresses,
  mockApiResponse,
  createTimeoutError,
} from '../constants';

const mockedAxiosGet = vi.mocked(axios.get);

describe('AppStore Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully fetch addresses', async () => {
    const mockResponse = mockApiResponse.success(
      mockAddresses,
      'Addresses found'
    );
    mockedAxiosGet.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAppStore());

    let response;
    await act(async () => {
      response = await result.current.getAddresses('Grünerløkka');
    });

    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.ADDRESS.SEARCH}/Grünerløkka`,
      { timeout: 10000 }
    );
    expect(response).toEqual({
      success: true,
      data: mockAddresses,
      message: 'Addresses found',
    });
  });

  it('should handle API error responses', async () => {
    const mockErrorResponse = mockApiResponse.error('No addresses found');
    mockedAxiosGet.mockResolvedValueOnce(mockErrorResponse);

    const { result } = renderHook(() => useAppStore());

    let response;
    await act(async () => {
      response = await result.current.getAddresses('InvalidLocation');
    });

    expect(response).toEqual({
      success: false,
      error: 'No addresses found',
      message: 'Error',
    });
  });

  it('should handle network timeouts', async () => {
    const timeoutError = createTimeoutError();
    mockedAxiosGet.mockRejectedValueOnce(timeoutError);

    const { result } = renderHook(() => useAppStore());

    let response;
    await act(async () => {
      response = await result.current.getAddresses('Grünerløkka');
    });

    expect(response).toEqual({
      success: false,
      error: 'timeout of 10000ms exceeded',
    });
  });

  it('should handle API success:false response with missing error message', async () => {
    const mockFailureResponse = {
      data: {
        success: false,
        message: 'API Error',
      },
    };
    mockedAxiosGet.mockResolvedValueOnce(mockFailureResponse);

    const { result } = renderHook(() => useAppStore());

    let response;
    await act(async () => {
      response = await result.current.getAddresses('InvalidQuery');
    });

    expect(response).toEqual({
      success: false,
      error: 'Failed to fetch addresses',
      message: 'API Error',
    });
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('Failed to fetch addresses');
  });

  it('should handle non-Error thrown values', async () => {
    // The 'error' in the catch block, is not intance of Error object
    const nonErrorValue = 'String error thrown';
    mockedAxiosGet.mockRejectedValueOnce(nonErrorValue);

    const { result } = renderHook(() => useAppStore());

    let response;
    await act(async () => {
      response = await result.current.getAddresses('TestQuery');
    });

    expect(response).toEqual({
      success: false,
      error: 'Failed to fetch addresses',
    });
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('Failed to fetch addresses');
  });

  it('should manage loading states correctly', async () => {
    const mockResponse = mockApiResponse.success([], 'No addresses found');
    mockedAxiosGet.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAppStore());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.getAddresses('Grünerløkka');
    });

    expect(result.current.isLoading).toBe(false);
  });
});

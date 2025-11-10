import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/apis';
import { ApiResponse } from '@/types/api';
import type { AppState } from '@/types/appStore';
import type { Address } from '@/types/address';

const initialState = {
  success: false,
  data: null,
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        getAddresses: async (searchTerm: string) => {
          try {
            set({ isLoading: true, error: null, data: null });
            const response = await axios.get<ApiResponse<Address[]>>(
              `${API_BASE_URL}${API_ENDPOINTS.ADDRESS.SEARCH}/${searchTerm}`,
              {
                timeout: 10000,
              }
            );

            if (response.data.success && response.data.data) {
              set({
                isLoading: false,
                error: null,
                data: response.data.data,
                message: response.data.message,
                success: true,
              });
              // Return response to client
              return {
                success: true,
                data: response.data.data,
                message: response.data.message,
              };
            } else {
              set({
                success: false,
                error: response.data?.error || 'Failed to fetch addresses',
                message: response.data?.message,
                isLoading: false,
              });
              // Return response to client
              return {
                success: false,
                error: response.data?.error || 'Failed to fetch addresses',
                message: response.data?.message,
              };
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : 'Failed to fetch addresses';
            set({
              success: false,
              error: errorMessage,
              isLoading: false,
            });
            return {
              success: false,
              error: errorMessage,
            };
          }
        },
      }),
      {
        name: 'app-store',
        partialize: state => ({
          addresses: state.data,
        }),
      }
    )
  )
);

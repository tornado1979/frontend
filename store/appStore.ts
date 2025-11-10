import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/apis';
import { ApiResponse } from '@/types/api';
import type { AppState } from '@/types/appStore';
import type { Address } from '@/types/address';

const initialState = {
  success: false,
  addresses: null,
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
            set({ isLoading: true, error: null, addresses: null });
            const response = await axios.get<ApiResponse<Address[]>>(
              `${API_BASE_URL}${API_ENDPOINTS.ADDRESS.SEARCH}/${searchTerm}`,
              {
                timeout: 10000,
              }
            );
            console.log('response:', response);

            if (response.data.success && response.data.data) {
              set({
                isLoading: false,
                error: null,
                addresses: response.data.data,
                message: response.data.message,
                success: true,
              });
            } else {
              set({
                success: false,
                error: response.data?.error || 'Failed to fetch addresses',
                message: response.data?.message,
                isLoading: false,
              });
            }
          } catch (error) {
            set({
              success: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch addresses',
              isLoading: false,
            });
          }
        },
      }),
      {
        name: 'app-store', // localStorage key
        partialize: state => ({
          addresses: state.addresses,
        }),
      }
    )
  )
);

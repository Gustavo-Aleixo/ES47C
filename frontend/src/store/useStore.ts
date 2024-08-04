import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Auth, Loading, TokenResponse } from '../types/types';


export const useStore = create<Auth & Loading>()(
  devtools(
    persist(
      (set) => ({
        tokenResponse: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        setTokenResponse: (tokenResponse: TokenResponse | null) => set({ tokenResponse }),
        setUser: user => set({ user, isAuthenticated: true }),
        setLogout: () => set({ tokenResponse: null, isAuthenticated: false, user: null }),
        startLoading: () => set({ loading: true }),
        stopLoading: () => set({ loading: false }),
      }),
      {
        name: 'myLocalStorage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
);
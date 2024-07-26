import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

type authState = {
  token: string;
  profile: any;
  isAuthenticated: boolean;
};

type authActions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
  setLogout: () => void;
};

export const useStore = create<authState & authActions>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        profile: null,
        isAuthenticated: false,
        setToken: token => set({ token }),
        setProfile: profile => set({ profile, isAuthenticated: true }),
        setLogout: () => set({ token: '', isAuthenticated: false, profile: null })
      }),
      {
        name: 'auth-token',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)





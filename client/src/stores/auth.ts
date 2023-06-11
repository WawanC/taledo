import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  setIsAuth: (val) => {
    set(() => ({
      isAuth: val
    }));
  }
}));

export default useAuthStore;

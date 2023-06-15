import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  darkMode: false,
  setDarkMode: (val) => set({ darkMode: val })
}));

export default useAppState;

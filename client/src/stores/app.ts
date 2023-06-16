import { create } from "zustand";

interface AppState {
  isDarkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  setDarkMode: (val) => set({ isDarkMode: val })
}));

export default useAppState;

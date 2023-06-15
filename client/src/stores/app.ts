import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  setDarkMode: (val) => set({ darkMode: val })
}));

export default useAppState;

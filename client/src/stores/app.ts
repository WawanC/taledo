import { create } from "zustand";

interface AppState {
  isDarkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isBoardInfoOpen: boolean;
  setBoardInfoOpen: (val: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  setDarkMode: (val) => set({ isDarkMode: val }),
  isBoardInfoOpen: false,
  setBoardInfoOpen: (val) => set({ isBoardInfoOpen: val }),
}));

export default useAppState;

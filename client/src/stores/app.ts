import { create } from "zustand";
import { Task } from "../types/task";

interface AppState {
  isDarkMode: boolean;
  setDarkMode: (val: boolean) => void;
  boardInfo: Task | null;
  setBoardInfo: (val: Task | null) => void;
}

const useAppState = create<AppState>((set) => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  setDarkMode: (val) => set({ isDarkMode: val }),
  boardInfo: null,
  setBoardInfo: (val) => set({ boardInfo: val })
}));

export default useAppState;

import { create } from "zustand";

type Store = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const useMainStore = create<Store>()((set) => ({
  theme: "light",
  setTheme: (theme) =>
    set(() => ({
      theme,
    })),
}));

export default useMainStore;

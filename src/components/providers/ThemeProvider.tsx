import useMainStore from "@/store/main.store";
import { ReactNode, useEffect } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useMainStore();
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme")!);
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, [setTheme]);
  return <div>{children}</div>;
};

export default ThemeProvider;

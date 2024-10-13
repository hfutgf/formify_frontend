import { cn } from "@/lib/utils";
import useMainStore from "@/store/main.store";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
  const { theme, setTheme } = useMainStore();
  const toggleTheme = (value: "light" | "dark") => {
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(value);
    setTheme(value);
    localStorage.setItem("theme", JSON.stringify(value));
  };

  return (
    <div className="border bg-light dark:bg-dark w-[72px] p-[4px] rounded-3xl">
      <div
        onClick={() => toggleTheme("dark")}
        className={cn(
          `w-full justify-start`,
          theme === "light" ? "flex" : "hidden"
        )}
      >
        <div className="w-[24px] flex items-center bg-black rounded-full p-[1px]">
          <Moon className="cursor-pointer text-white" />
        </div>
      </div>
      <div
        onClick={() => toggleTheme("light")}
        className={cn(
          `w-full justify-end`,
          theme === "dark" ? "flex" : "hidden"
        )}
      >
        <div className="w-[24px] flex items-center bg-black rounded-full p-[1px]">
          <Sun className="cursor-pointer text-white" />
        </div>
      </div>
    </div>
  );
};

export default Theme;

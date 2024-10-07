import routesConfig from "@/config/routes.config";
import { DoorOpen, Github, Moon, Search, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import useUserStore from "@/store/user.store";
import { useMutation } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";
import { AuthService } from "@/services/auth.service";

const Header = () => {
  const [theme, setTheme] = useState<string>("light");
  const { user, setUser } = useUserStore();

  const authService = new AuthService();
  const navigate = useNavigate();

  const { isPending, data, mutate } = useMutation({
    mutationKey: [queryConfig.LOGOUT],
    mutationFn: async () => await authService.logout(),
    onSuccess: () => {
      navigate(routesConfig.LOGIN);
    },
  });

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme")!);
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    if (currentUser) setUser(currentUser);
  }, [setUser]);

  const toggleTheme = (value: string) => {
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(value);
    setTheme(value);
    localStorage.setItem("theme", JSON.stringify(value));
  };

  const onLogOut = async () => {
    mutate();
    localStorage.clear();
  };

  useEffect(() => {
    if (data) setUser(null);
  }, [data, setUser]);

  return (
    <div className="bg-white dark:bg-black shadow-md">
      <div className="container mx-auto min-h-[70px] max-h-[70px] grid grid-cols-[2fr_4fr_6fr]">
        <div className="flex items-center justify-start">
          <Link
            to={routesConfig.DASHBOARD}
            className="min-h-[70px] max-h-[70px] flex items-center group"
          >
            <Github
              size={36}
              className="group-hover:opacity-70 duration-300 dark:text-white"
            />
          </Link>
        </div>
        <div className="min-h-[70px] max-h-[70px] flex items-center">
          <div className="border flex items-center w-full rounded-md">
            <Input placeholder="Search template" className="border-none" />
            <Button
              variant={"ghost"}
              className="rounded-tl-none rounded-bl-none"
            >
              <Search size={24} />
            </Button>
          </div>
        </div>
        <div className="min-h-[70px] max-h-[70px] flex items-center justify-end gap-[24px]">
          <div className="border bg-light w-[72px] p-[4px] rounded-3xl">
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
          <Popover>
            <PopoverTrigger className="border p-2 rounded-sm">
              EN
            </PopoverTrigger>
            <PopoverContent className="w-[56px] flex flex-col space-y-1 items-center justify-center">
              <div className="cursor-pointer hover:bg-light dark:hover:bg-dark duration-200 w-full flex items-center justify-center rounded-sm">
                EN
              </div>
              <div className="cursor-pointer hover:bg-light dark:hover:bg-dark duration-200 w-full flex items-center justify-center rounded-sm">
                RU
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-[4px]">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to={routesConfig.PROFILE}>
                  <Button
                    variant={"outline"}
                    className="text-[16px] flex items-start justify-center space-x-1"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button
                  onClick={onLogOut}
                  variant={"outline"}
                  disabled={isPending}
                  className="text-[16px] flex items-start justify-center space-x-1"
                >
                  <DoorOpen size={20} />
                </Button>
              </div>
            ) : (
              <>
                <Link to={routesConfig.LOGIN}>
                  <Button variant={"outline"} className="text-[16px]">
                    Sign in
                  </Button>
                </Link>
                <Link to={routesConfig.REGISTER}>
                  <Button variant={"outline"} className="text-[16px]">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

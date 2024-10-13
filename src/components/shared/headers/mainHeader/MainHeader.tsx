import routesConfig from "@/config/routes.config";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import Theme from "./Theme";
import Language from "./Language";
import Links from "./Links";
import SearchTemplate from "./SearchTemplate";

const Header = () => {
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
        <SearchTemplate />
        <div className="min-h-[70px] max-h-[70px] flex items-center justify-end gap-[24px]">
          <Theme />
          <Language />
          <Links />
        </div>
      </div>
    </div>
  );
};

export default Header;

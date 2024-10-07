import routesConfig from "@/config/routes.config";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const TemplateHeader = () => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto grid grid-cols-[3fr_6fr_3fr]">
        <div className="flex items-center justify-start">
          <Link
            to={routesConfig.DASHBOARD}
            className="min-h-[70px] max-h-[70px] flex items-center justify-start group"
          >
            <Github
              size={36}
              className="group-hover:opacity-70 duration-300 dark:text-white"
            />
          </Link>
        </div>
        <div className="min-h-[70px] max-h-[70px] flex items-end justify-center">navs</div>
      </div>
    </div>
  );
};

export default TemplateHeader;

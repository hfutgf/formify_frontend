import routesConfig from "@/config/routes.config";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const SidebarProfile = () => {
  const location = useLocation();
  return (
    <div className="w-[15%] min-h-[calc(100vh-70px)] border-r flex flex-col p-[16px_20px]">
      <Link
        to={routesConfig.PERSONAL}
        className={cn(
          location.pathname === routesConfig.PERSONAL ? "underline" : "",
          "p-[4px]"
        )}
      >
        Personal
      </Link>
      <Link
        to={routesConfig.MY_TEMPLATES}
        className={cn(
          location.pathname === routesConfig.MY_TEMPLATES ? "underline" : "",
          "p-[4px]"
        )}
      >
        My templates
      </Link>
      <Link
        to={routesConfig.FORMS}
        className={cn(
          location.pathname === routesConfig.FORMS ? "underline" : "",
          "p-[4px]"
        )}
      >
        Forms
      </Link>
    </div>
  );
};

export default SidebarProfile;

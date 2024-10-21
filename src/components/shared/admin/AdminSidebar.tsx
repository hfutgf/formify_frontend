import routesConfig from "@/config/routes.config";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <div className="w-[15%] border-r min-h-screen p-[16px] flex flex-col gap-[4px]">
      <Link
        to={routesConfig.ADMIN_USERS}
        className={cn(
          location.pathname === routesConfig.ADMIN_USERS ? "underline" : ""
        )}
      >
        Users
      </Link>
      <Link
        to={routesConfig.ADMIN_TEMPLATES}
        className={cn(
          location.pathname === routesConfig.ADMIN_TEMPLATES ? "underline" : ""
        )}
      >
        Templates
      </Link>
    </div>
  );
};

export default AdminSidebar;

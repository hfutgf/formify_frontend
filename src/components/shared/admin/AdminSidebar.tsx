import routesConfig from "@/config/routes.config";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div className="w-[15%] border-r min-h-screen p-[16px] flex flex-col gap-[4px]">
      <Link
        to={routesConfig.ADMIN_USERS}
        className={cn(
          location.pathname === routesConfig.ADMIN_USERS ? "underline" : ""
        )}
      >
        {t("users")}
      </Link>
      <Link
        to={routesConfig.ADMIN_TEMPLATES}
        className={cn(
          location.pathname === routesConfig.ADMIN_TEMPLATES ? "underline" : ""
        )}
      >
        {t("templates")}
      </Link>
    </div>
  );
};

export default AdminSidebar;

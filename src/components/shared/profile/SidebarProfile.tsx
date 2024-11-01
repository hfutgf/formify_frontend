import routesConfig from "@/config/routes.config";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/users.store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const SidebarProfile = () => {
  const [userId, setUserId] = useState<string>();
  const { user } = useUserStore();
  const location = useLocation();

  const { t } = useTranslation();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId")!);
    if (id) {
      setUserId(id);
    }
  }, [location]);

  return (
    <div className="w-[15%] min-h-[calc(100vh-70px)] border-r flex flex-col p-[16px_20px]">
      <Link
        to={routesConfig.PERSONAL + `/${userId}`}
        className={cn(
          location.pathname.slice(0, -(userId ? userId?.length + 1 : 0)) ===
            routesConfig.PERSONAL
            ? "underline"
            : "",
          "p-[4px]"
        )}
      >
        {t("personal")}
      </Link>
      <Link
        to={routesConfig.MY_TEMPLATES}
        className={cn(
          location.pathname === routesConfig.MY_TEMPLATES ? "underline" : "",
          "p-[4px]"
        )}
      >
        {t("templates")}
      </Link>
      {user?.role === "ADMIN" ? (
        <Link
          to={routesConfig.ADMIN_USERS}
          className={cn(
            location.pathname === routesConfig.FORMS ? "underline" : "",
            "p-[4px]"
          )}
        >
          {t("admin-panel")}
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SidebarProfile;

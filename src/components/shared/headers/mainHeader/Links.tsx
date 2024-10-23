import { Button } from "@/components/ui/button";
import { queryConfig } from "@/config/query.config";
import routesConfig from "@/config/routes.config";
import { AuthService } from "@/services/auth.service";
import useUserStore from "@/store/users.store";
import { useMutation } from "@tanstack/react-query";
import { DoorOpen, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Links = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authService = new AuthService();
  const { isPending, mutate } = useMutation({
    mutationKey: [queryConfig.LOGOUT],
    mutationFn: async () => await authService.logout(),
    onSuccess: () => {
      navigate(routesConfig.LOGIN);
      setUser(null);
    },
  });

  const onLogOut = async () => {
    mutate();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("searchTemplates");
  };
  return (
    <div className="flex items-center gap-[4px]">
      {user ? (
        <div className="flex items-center space-x-2">
          <Link to={routesConfig.PERSONAL}>
            <Button
              variant={"outline"}
              className="text-[16px] flex items-start justify-center space-x-1"
            >
              <User size={20} />
              <span>{t("profile")}</span>
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
              {t("sign-in")}
            </Button>
          </Link>
          <Link to={routesConfig.REGISTER}>
            <Button variant={"outline"} className="text-[16px]">
              {t("sign-up")}
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Links;

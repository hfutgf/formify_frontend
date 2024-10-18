import routesConfig from "@/config/routes.config";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFoundLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(routesConfig.DASHBOARD);
    }
  }, [location.pathname, navigate]);
  return <div>{children}</div>;
};

export default NotFoundLayout;

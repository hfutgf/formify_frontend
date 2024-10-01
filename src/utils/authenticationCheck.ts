import tokens from "@/config/tokens.config";
import Cookies from "js-cookie";
import { Location, NavigateFunction } from "react-router-dom";
import routesConfig from "@/config/routes.config";
import { jwtDecode } from "jwt-decode";

const authenticationCheck = (
  navigate: NavigateFunction,
  location: Location<unknown>
) => {
  const cookie = Cookies.get(tokens.REFRESH_TOKEN);
  if (cookie) {
    const isValid = jwtDecode(cookie, import.meta.env.JWT_SECRET);
    if (isValid) {
      navigate(routesConfig.DASHBOARD);
    } else {
      if (
        location.pathname.startsWith("/auth") !==
        routesConfig.REGISTER.startsWith("/auth")
      ) {
        navigate(routesConfig.LOGIN);
      }
    }
  } else {
    if (
      location.pathname.startsWith("/auth") !==
      routesConfig.REGISTER.startsWith("/auth")
    ) {
      navigate(routesConfig.LOGIN);
    }
  }
};
export default authenticationCheck;

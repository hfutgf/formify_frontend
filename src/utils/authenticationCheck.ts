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
  if (!cookie) {
    if (!location.pathname.startsWith("/auth")) {
      return navigate(routesConfig.LOGIN);
    }
  } else {
    const isValid = jwtDecode(cookie);
    if (!isValid) {
      if (!location.pathname.startsWith("/auth")) {
        return navigate(routesConfig.LOGIN);
      }
    } else {
      if (location.pathname.startsWith("/auth")) {
        navigate(routesConfig.DASHBOARD);
      }
    }
  }
};
export default authenticationCheck;

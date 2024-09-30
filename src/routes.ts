import { lazy } from "react";
import routesConfig from "./config/routes.config";

const authRoutes = [
  {
    component: lazy(() => import("./components/pages/auth/Login")),
    path: routesConfig.LOGIN,
  },
  {
    component: lazy(() => import("./components/pages/auth/Registration")),
    path: routesConfig.REGISTER,
  },
];

const dashboardRoutes = [
  {
    component: lazy(() => import("./components/pages/dashboard/Main")),
    path: routesConfig.DASHBOARD,
  },
];

const notFound = [
  {
    component: lazy(() => import("./components/pages/notFound/NotFound")),
    path: routesConfig.DASHBOARD,
  },
];

export { authRoutes, dashboardRoutes, notFound };

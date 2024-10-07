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
    component: lazy(() => import("./components/pages/dashboard/Dashboard")),
    path: routesConfig.DASHBOARD,
  },
  {
    component: lazy(
      () => import("./components/pages/profile/Profile")
    ),
    path: routesConfig.PROFILE,
  },
];

const templateRoutes = [
  {
    component: lazy(() => import("./components/pages/template/Template")),
    path: routesConfig.TEMPLATE + "/:templateId",
  },
];

const notFound = [
  {
    component: lazy(() => import("./components/pages/notFound/NotFound")),
    path: routesConfig.DASHBOARD,
  },
];

export { authRoutes, dashboardRoutes, notFound, templateRoutes };

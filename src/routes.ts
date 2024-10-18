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
      () => import("./components/pages/serachResult/SearchResult")
    ),
    path: routesConfig.SEARCH,
  },
];

const profileRoutes = [
  {
    component: lazy(() => import("./components/pages/profile/Personal")),
    path: routesConfig.PERSONAL,
  },
  {
    component: lazy(() => import("./components/pages/profile/MyTemplates")),
    path: routesConfig.MY_TEMPLATES,
  },
  {
    component: lazy(() => import("./components/pages/profile/Forms")),
    path: routesConfig.FORMS,
  },
];

const templateRoutes = [
  {
    component: lazy(() => import("./components/pages/questions/Quesitons")),
    path: routesConfig.TEMPLATE + "/:templateId",
  },
  {
    component: lazy(() => import("./components/pages/forms/Forms")),
    path: routesConfig.TEMPLATE + "/forms/:templateId",
  },
];

const answerRoutes = [
  {
    component: lazy(() => import("./components/pages/answers/Answers")),
    path: routesConfig.ANSWERS + "/forms/:formId/:authorId",
  },
];

const notFound = [
  {
    component: lazy(() => import("./components/pages/notFound/NotFound")),
    path: routesConfig.DASHBOARD,
  },
];

export {
  authRoutes,
  dashboardRoutes,
  notFound,
  templateRoutes,
  profileRoutes,
  answerRoutes,
};

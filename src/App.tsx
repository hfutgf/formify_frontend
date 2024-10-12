import { Route, Routes, useLocation } from "react-router-dom";
import { authRoutes, dashboardRoutes, templateRoutes } from "./routes";
import NotFound from "./components/pages/notFound/NotFound";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import TemplateLayout from "./components/layouts/TemplateLayout";
import { useEffect } from "react";
import useUserStore from "./store/users.store";
import userSession from "./utils/userSession";

const App = () => {
  const { setUser } = useUserStore();
  const location = useLocation();
  useEffect(() => {
    userSession().then((user) => setUser(user));
  }, [setUser]);

  return (
    <Routes>
      {location.pathname.startsWith("/auth") ? (
        authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthLayout>
                <route.component />
              </AuthLayout>
            }
          />
        ))
      ) : location.pathname.startsWith("/dashboard") ? (
        dashboardRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <DashboardLayout>
                <route.component />
              </DashboardLayout>
            }
          />
        ))
      ) : location.pathname.startsWith("/template") ? (
        templateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <TemplateLayout>
                <route.component />
              </TemplateLayout>
            }
          />
        ))
      ) : (
        <Route path={"*"} element={<NotFound />} />
      )}
    </Routes>
  );
};

export default App;

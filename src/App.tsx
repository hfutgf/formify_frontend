import { Route, Routes, useLocation } from "react-router-dom";
import {
  answerRoutes,
  authRoutes,
  dashboardRoutes,
  profileRoutes,
  templateRoutes,
} from "./routes";
import NotFound from "./components/pages/notFound/NotFound";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import TemplateLayout from "./components/layouts/TemplateLayout";
import { useEffect } from "react";
import useUserStore from "./store/users.store";
import userSession from "./utils/userSession";
import ProfileLayout from "./components/layouts/ProfileLayout";
import AnswerLayout from "./components/layouts/AnswerLayout";
import NotFoundLayout from "./components/layouts/NotFoundLayout";

const App = () => {
  const { setUser } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    userSession().then((user) => {
      setUser(user!);
      localStorage.setItem("user", JSON.stringify(user));
    });
  }, [setUser]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      setUser(user);
    }
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
      ) : location.pathname.startsWith("/profile") ? (
        profileRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProfileLayout>
                <route.component />
              </ProfileLayout>
            }
          />
        ))
      ) : location.pathname.startsWith("/answers") ? (
        answerRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AnswerLayout>
                <route.component />
              </AnswerLayout>
            }
          />
        ))
      ) : (
        <Route
          path={"*"}
          element={
            <NotFoundLayout>
              <NotFound />
            </NotFoundLayout>
          }
        />
      )}
    </Routes>
  );
};

export default App;

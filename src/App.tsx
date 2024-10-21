import { Route, Routes, useLocation } from "react-router-dom";
import {
  adminPanelRoutes,
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
import AdminLayout from "./components/layouts/AdminLayout";

const App = () => {
  const { setUser } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    userSession().then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user!);
      }
    });
  }, [setUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
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
      ) : location.pathname.startsWith("/admin") ? (
        adminPanelRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AdminLayout>
                <route.component />
              </AdminLayout>
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

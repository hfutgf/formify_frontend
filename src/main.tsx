import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/pages/loading/Loading.tsx";
import TanstackProvider from "./components/providers/TanstackProvider.tsx";
import ThemeProvider from "./components/providers/ThemeProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/config/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <TanstackProvider>
        <ThemeProvider>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </TanstackProvider>
    </Suspense>
  </BrowserRouter>
);

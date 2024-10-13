import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/pages/loading/Loading.tsx";
import TanstackProvider from "./components/providers/TanstackProvider.tsx";
import ThemeProvider from "./components/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <TanstackProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </TanstackProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

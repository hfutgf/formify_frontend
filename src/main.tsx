import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/pages/loading/Loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);

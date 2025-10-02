import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePageView } from "./views/HomePageView.tsx";
import { LoginPageView } from "./views/LoginPageView.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePageView />} />
      <Route path="/login" element={<LoginPageView />} />
    </Routes>
  </BrowserRouter>
);

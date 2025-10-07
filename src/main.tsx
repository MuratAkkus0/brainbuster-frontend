import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePageView } from "./views/HomePageView.tsx";
import { LoginPageView } from "./views/LoginPageView.tsx";
import { RegisterFormView } from "./views/RegisterFormView.tsx";
import { AdminDashboardView } from "./views/AdminDashboardView.tsx";
import { GameOverviewView } from "./views/GameOverviewView.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePageView />} />
      <Route path="/login" element={<LoginPageView />} />
      <Route path="/register" element={<RegisterFormView />} />
      <Route path="/admin/dashboard" element={<AdminDashboardView />} />
      <Route path="/quiz" element={<GameOverviewView />} />
    </Routes>
  </BrowserRouter>
);

import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePageView } from "./views/HomePageView.tsx";
import { LoginPageView } from "./views/LoginPageView.tsx";
import { RegisterFormView } from "./views/RegisterFormView.tsx";
import AdminDashboard from "./components/molecules/AdminDashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePageView />} />
      <Route path="/login" element={<LoginPageView />} />
      <Route path="/register" element={<RegisterFormView />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);

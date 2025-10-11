import { BrowserRouter, Route, Routes } from "react-router";
import { HomePageView } from "./views/HomePageView.tsx";
import { LoginPageView } from "./views/LoginPageView.tsx";
import { RegisterFormView } from "./views/RegisterFormView.tsx";
import { AdminDashboardView } from "./views/AdminDashboardView.tsx";
import { GameOverviewView } from "./views/GameOverviewView.tsx";

import { LogoutView } from "./views/LogoutView.tsx";
import { RequireAuth } from "./components/RequireAuth.tsx";
import { NotFoundView } from "./views/NotFoundView.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<HomePageView />} />
        <Route path="/login" element={<LoginPageView />} />
        <Route path="/register" element={<RegisterFormView />} />
        <Route path="/logout" element={<LogoutView />} />

        {/* has to be authenticated */}
        <Route element={<RequireAuth />}>
          <Route path="/admin/dashboard" element={<AdminDashboardView />} />
          <Route path="/quiz" element={<GameOverviewView />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
};

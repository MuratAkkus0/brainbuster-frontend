import { BrowserRouter, Route, Routes } from "react-router";
import { HomePageView } from "./views/HomePageView.tsx";
import { LoginPageView } from "./views/LoginPageView.tsx";
import { RegisterFormView } from "./views/RegisterFormView.tsx";
import { AdminDashboardView } from "./views/AdminDashboardView.tsx";
import { GameOverviewView } from "./views/GameOverviewView.tsx";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageView />} />
          <Route path="/login" element={<LoginPageView />} />
          <Route path="/register" element={<RegisterFormView />} />
          <Route path="/admin/dashboard" element={<AdminDashboardView />} />
          <Route path="/quiz" element={<GameOverviewView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

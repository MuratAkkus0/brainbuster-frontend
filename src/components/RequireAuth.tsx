import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const { user } = useAuth();
  const localStorageToken = localStorage.getItem("ut");
  const storeToken = user.user?.token;
  const location = useLocation();
  let token = "";

  if (!storeToken && localStorageToken) {
    token = localStorageToken;
  } else if (storeToken && localStorageToken) {
    if (storeToken !== localStorageToken) {
      return (
        <Navigate to={"/logout"} state={{ from: location.pathname }} replace />
      );
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
};

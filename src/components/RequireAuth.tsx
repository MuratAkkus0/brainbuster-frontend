import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  const localStorageToken = localStorage.getItem("ut");
  const storeToken = user.user?.token;
  let token;
  let isAuth = false;
  if (!storeToken && localStorageToken) {
    token = localStorageToken;
  } else if (storeToken && !localStorageToken) {
    token = localStorageToken;
  }
  if (storeToken && localStorageToken) {
    if (storeToken !== localStorageToken) {
      isAuth = false;
    } else {
      isAuth = true;
    }
  }
  return (
    <>
      {isAuth ? (
        <Outlet />
      ) : (
        <Navigate to={"/logout"} state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

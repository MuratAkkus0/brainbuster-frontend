import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

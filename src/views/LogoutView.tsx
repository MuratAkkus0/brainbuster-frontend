import { useLogout } from "@/hooks";
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router";

export const LogoutView = () => {
  const logout = useLogout();
  const location = useLocation();
  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Navigate to={"/"} state={{ from: location.pathname }} replace />
    </>
  );
};

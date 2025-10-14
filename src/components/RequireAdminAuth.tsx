import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const RequireAdminAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  const localStorageToken = localStorage.getItem("ut");
  const storeToken = user.user?.token;
  const userRole = user.user?.user.role;

  let isAuth = false;
  let isAdmin = false;

  // Check if user is authenticated
  if (storeToken && localStorageToken) {
    if (storeToken === localStorageToken) {
      isAuth = true;
    }
  }

  // Check if user has admin role
  if (isAuth && userRole) {
    // Check for admin role (case-insensitive)
    isAdmin = userRole.toLowerCase().includes("admin");
  }

  useEffect(() => {
    if (isAuth && !isAdmin && !hasShownToast) {
      toast.error("Access denied. Admin privileges required.");
      setHasShownToast(true);
    }
  }, [isAuth, isAdmin, hasShownToast]);

  // Not authenticated -> redirect to logout
  if (!isAuth) {
    return (
      <Navigate to="/logout" state={{ from: location.pathname }} replace />
    );
  }

  // Authenticated but not admin -> redirect to profile
  if (!isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  // Authenticated and admin -> allow access
  return <Outlet />;
};

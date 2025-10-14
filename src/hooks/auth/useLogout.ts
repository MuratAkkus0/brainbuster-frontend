import { logOut } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useLogout = () => {
  const dispatch = useDispatch();
  const getLogout = () => {
    try {
      localStorage.removeItem("ut");
      dispatch(logOut());
      toast.success("You have been logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("An error occurred during logout");
    }
  };
  return getLogout;
};

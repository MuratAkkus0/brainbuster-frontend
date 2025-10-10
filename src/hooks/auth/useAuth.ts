import type { UserState } from "@/store/slices/userSlice";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((store: RootState): UserState => store.user);
  return { user, isAuthenticated: !!user.user };
};

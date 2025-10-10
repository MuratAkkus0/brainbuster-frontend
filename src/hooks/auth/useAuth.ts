import type { UserState } from "@/store/slices/userSlice";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface AuthHook {
  (): CallableFunction;
}

export const useAuth: AuthHook = () => {
  const getAuth = () => {
    const user = useSelector((store: RootState): UserState => store.user);
    return user;
  };
  return getAuth;
};

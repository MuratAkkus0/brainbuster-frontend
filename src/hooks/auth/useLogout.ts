import { logOut } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();
  const getLogout = () => {
    dispatch(logOut());
  };
  return getLogout;
};

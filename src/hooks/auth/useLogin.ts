import { handleLogin } from "@/store/slices/userSlice";
import type { LoginObjectModel } from "@/types/models/Auth/LoginObjectModel";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { UserModel } from "@/types/models/Auth/UserModel";

interface LoginHook {
  (): CallableFunction;
}

export const useLogin: LoginHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login = async (
    loginCredential: LoginObjectModel
  ): Promise<UserModel> => {
    const data = await dispatch(handleLogin(loginCredential));
    console.log(data);
    const user = data.payload;
    return user as UserModel;
  };
  return login;
};

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
  ): Promise<UserModel | void> => {
    console.log("login useLogin ");
    dispatch(handleLogin(loginCredential)).then((item) => {
      const loginData = item.payload as UserModel;

      console.log(loginData);

      if (loginData.user) {
        return loginData.user;
      } else {
        return loginData;
      }
    });
  };
  return login;
};

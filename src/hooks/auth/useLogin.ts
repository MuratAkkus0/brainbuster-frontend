import { handleLogin } from "@/store/slices/userSlice";
import type { LoginObjectModel } from "@/types/models/Auth/LoginObjectModel";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { UserModel } from "@/types/models/Auth/UserModel";

interface LoginHook {
  (): CallableFunction;
}

interface LoginHookFunction {
  (loginCredential: LoginObjectModel): Promise<UserModel | void>;
}

export const useLogin: LoginHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login: LoginHookFunction = async (loginCredential) => {
    console.log("login useLogin ");
    let res = dispatch(handleLogin(loginCredential))
      .then((item) => {
        const loginData = item.payload as UserModel;
        return loginData;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  };
  return login;
};

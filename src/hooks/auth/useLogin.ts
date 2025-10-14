import { handleLogin } from "@/store/slices/userSlice";
import type { LoginObjectModel } from "@/types/models/Auth/LoginObjectModel";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { UserModel } from "@/types/models/Auth/UserModel";
import { toast } from "sonner";

interface LoginHook {
  (): CallableFunction;
}

interface LoginHookFunction {
  (loginCredential: LoginObjectModel): Promise<UserModel | void>;
}

export const useLogin: LoginHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login: LoginHookFunction = async (loginCredential) => {
    try {
      const result = await dispatch(handleLogin(loginCredential));
      
      if (result.meta.requestStatus === "fulfilled") {
        const loginData = result.payload as UserModel;
        localStorage.setItem("ut", loginData.token);
        toast.success("Login successful! Welcome back.");
        return loginData;
      } else {
        const errorMessage = (result.payload as any)?.message || "Login failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred during login");
      throw err;
    }
  };
  return login;
};

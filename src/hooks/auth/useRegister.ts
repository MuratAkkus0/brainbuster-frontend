import { handleRegister, setUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { UserModel } from "@/types/models/Auth/UserModel";
import type { RegisterObjectModel } from "@/types/models/Auth/RegisterObjectModel";
import { toast } from "sonner";

interface RegisterHook {
  (): CallableFunction;
}

interface RegisterHookFunction {
  (registerCredential: RegisterObjectModel): Promise<UserModel | void>;
}

export const useRegister: RegisterHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const register: RegisterHookFunction = async (registerCredential) => {
    try {
      const result = await dispatch(handleRegister(registerCredential));
      
      if (result.meta.requestStatus === "fulfilled") {
        const registerData = result.payload as UserModel;
        if (registerData?.user) {
          dispatch(setUser(registerData));
          localStorage.setItem("ut", registerData.token);
          toast.success("Registration successful! Welcome to BrainBuster.");
          return registerData;
        } else {
          const errorMessage = "Registration failed";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      } else {
        const errorMessage = (result.payload as any)?.message || "Registration failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An unexpected error occurred during registration");
      throw err;
    }
  };
  return register;
};

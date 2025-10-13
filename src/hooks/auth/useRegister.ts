import { handleRegister, setUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { UserModel } from "@/types/models/Auth/UserModel";
import type { RegisterObjectModel } from "@/types/models/Auth/RegisterObjectModel";

interface RegisterHook {
  (): CallableFunction;
}

interface RegisterHookFunction {
  (registerCredential: RegisterObjectModel): Promise<UserModel | void>;
}

export const useRegister: RegisterHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const register: RegisterHookFunction = async (registerCredential) => {
    console.log("register hook");
    let result = dispatch(handleRegister(registerCredential))
      .then((item) => {
        const registerData = item.payload as UserModel;
        if (registerData?.user) {
          dispatch(setUser(registerData));
          localStorage.setItem("ut", registerData.token);
        } else {
          return registerData;
        }
        return registerData;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });

    return result;
  };
  return register;
};

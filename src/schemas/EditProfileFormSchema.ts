import z from "zod";
import { stringRegex } from "./Regex";
import {
  passwordLowerMsg,
  passwordMaxMsg,
  passwordMinMsg,
  passwordNumberMsg,
  passwordSpaceMsg,
  passwordSpecialMsg,
  passwordUpperMsg,
  usernameMaxMsg,
  usernameMinMsg,
  usernameSpaceMsg,
} from "./SchemaErrorMessages";

export const EditProfileFormSchema = z
  .object({
    username: z
      .string()
      .min(8, usernameMinMsg)
      .max(16, usernameMaxMsg)
      .nonempty()
      .refine((val) => stringRegex.hasNoSpaces.test(val), {
        message: usernameSpaceMsg,
      }),
    currentPassword: z
      .string()
      .min(8, passwordMinMsg)
      .max(24, passwordMaxMsg)
      .nonempty()
      .refine((val) => stringRegex.hasUpper.test(val), {
        message: passwordUpperMsg,
      })
      .refine((val) => stringRegex.hasLower.test(val), {
        message: passwordLowerMsg,
      })
      .refine((val) => stringRegex.hasNumber.test(val), {
        message: passwordNumberMsg,
      })
      .refine((val) => stringRegex.hasSpecial.test(val), {
        message: passwordSpecialMsg,
      })
      .refine((val) => stringRegex.hasNoSpaces.test(val), {
        message: passwordSpaceMsg,
      }),
    password: z
      .string()
      .min(8, passwordMinMsg)
      .max(24, passwordMaxMsg)
      .nonempty()
      .refine((val) => stringRegex.hasUpper.test(val), {
        message: passwordUpperMsg,
      })
      .refine((val) => stringRegex.hasLower.test(val), {
        message: passwordLowerMsg,
      })
      .refine((val) => stringRegex.hasNumber.test(val), {
        message: passwordNumberMsg,
      })
      .refine((val) => stringRegex.hasSpecial.test(val), {
        message: passwordSpecialMsg,
      })
      .refine((val) => stringRegex.hasNoSpaces.test(val), {
        message: passwordSpaceMsg,
      }),
    confirmPassword: z
      .string()
      .min(8, passwordMinMsg)
      .max(24, passwordMaxMsg)
      .nonempty()
      .refine((val) => stringRegex.hasUpper.test(val), {
        message: passwordUpperMsg,
      })
      .refine((val) => stringRegex.hasLower.test(val), {
        message: passwordLowerMsg,
      })
      .refine((val) => stringRegex.hasNumber.test(val), {
        message: passwordNumberMsg,
      })
      .refine((val) => stringRegex.hasSpecial.test(val), {
        message: passwordSpecialMsg,
      })
      .refine((val) => stringRegex.hasNoSpaces.test(val), {
        message: passwordSpaceMsg,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

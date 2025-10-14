import z from "zod";
import { stringRegex } from "./Regex";

import {
  answerMaxMsg,
  answerMinMsg,
  passwordLowerMsg,
  passwordMatchMsg,
  passwordMaxMsg,
  passwordMinMsg,
  passwordNumberMsg,
  passwordSpaceMsg,
  passwordSpecialMsg,
  passwordUpperMsg,
  questionSelectMsg,
  questionSpaceMsg,
  usernameMaxMsg,
  usernameMinMsg,
  usernameSpaceMsg,
} from "./SchemaErrorMessages";

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(8, usernameMinMsg)
      .max(16, usernameMaxMsg)
      .nonempty()
      .refine((val) => stringRegex.hasNoSpaces.test(val), {
        message: usernameSpaceMsg,
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
    confirmPassword: z.string().min(8).max(24).nonempty(),
    secretQuestionId: z.coerce
      .number()
      .min(0, questionSelectMsg)
      .nonnegative()
      .nonoptional()
      .refine((val) => stringRegex.hasNoSpaces.test(val.toString()), {
        message: questionSpaceMsg,
      }),
    secretQuestionAnswer: z.string().min(3, answerMinMsg).max(32, answerMaxMsg),
    privacyPolicyAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the Privacy Policy to register",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMatchMsg,
    path: ["confirmPassword"],
  });

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import questionsData from "./secQuestions.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormErrorLabel } from "../atoms/FormErrorLabel";
import { FormInputWrapper } from "../atoms/FormInputWrapper";
import { useRegister } from "@/hooks";
import type { RegisterObjectModel } from "@/types/models/Auth/RegisterObjectModel";
import { useNavigate } from "react-router";
import { registerFormSchema } from "@/schemas/RegisterFormSchema";
import { useState } from "react";

const questions = questionsData.questions as string[];

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  secretQuestionId: number;
  secretQuestionAnswer: string;
}

const CustomSelect = ({
  errMsg,
  onValueChange,
}: {
  errMsg?: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <>
      <Select onValueChange={onValueChange}>
        <div className="flex flex-col">
          <SelectTrigger
            className={cn("w-full", errMsg && "border border-red-500")}
          >
            <SelectValue placeholder="Select a question" />
          </SelectTrigger>
          <SelectContent className="max-md:w-[calc(100vw-3rem)]">
            <SelectGroup>
              <SelectLabel>Questions</SelectLabel>
              {questions.map((item, i) => (
                <SelectItem data-id={i} key={i} value={i.toString()}>
                  <span className="max-md:w-[calc(100vw-7rem)] overflow-hidden">
                    {item}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </div>
      </Select>
    </>
  );
};

const CustomRegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [apiFormError, setApiFormError] = useState("");
  const callRegister = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      secretQuestionId: -1,
      secretQuestionAnswer: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (e: RegisterForm) => {
    const data: RegisterObjectModel = {
      username: e.username,
      password: e.password,
      secretQuestionId: e.secretQuestionId,
      secretQuestionAnswer: e.secretQuestionAnswer,
    };
    let res = await callRegister(data);
    console.log(res);
    if (res?.isError && res.cause === 401) {
      setError("username", { message: "This username is already exists." });
    } else if (res?.isError) {
      setApiFormError(res.message);
    }
    console.log(res);
    if (!res?.isError) {
      reset();
      navigate("/");
    }
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="max-md:rounded-none">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your username below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormErrorLabel errMsg={apiFormError} />
            <div className="flex flex-col gap-6 md:gap-8">
              <FormInputWrapper>
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username")}
                  errMsg={errors.username?.message}
                  id="username"
                  type="text"
                  placeholder="tony_stark"
                  required
                />
                <FormErrorLabel errMsg={errors.username?.message} />
              </FormInputWrapper>
              <FormInputWrapper>
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  errMsg={errors.password?.message}
                  id="password"
                  type="password"
                  required
                />
                <FormErrorLabel errMsg={errors.password?.message} />
              </FormInputWrapper>
              <FormInputWrapper>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  errMsg={errors.confirmPassword?.message}
                  id="confirm-password"
                  type="password"
                  required
                />
                <FormErrorLabel errMsg={errors.confirmPassword?.message} />
              </FormInputWrapper>
              <FormInputWrapper>
                <Label>Your Secret Question</Label>
                <CustomSelect
                  errMsg={errors.secretQuestionId?.message}
                  onValueChange={(e: string) =>
                    setValue("secretQuestionId", Number(e))
                  }
                  {...register("secretQuestionId")}
                />
                <FormErrorLabel errMsg={errors.secretQuestionId?.message} />
                <Input
                  {...register("secretQuestionAnswer")}
                  errMsg={errors.secretQuestionAnswer?.message}
                  id="question-answer"
                  type="text"
                  placeholder="The secret is : i am a nerd..."
                  required
                />
                <FormErrorLabel errMsg={errors.secretQuestionAnswer?.message} />
              </FormInputWrapper>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="text-lg text-theme-dark-bg bg-theme-accent cursor-pointer hover:bg-theme-accent-hover"
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const RegisterForm = () => {
  return (
    <>
      <CustomRegisterForm />
    </>
  );
};

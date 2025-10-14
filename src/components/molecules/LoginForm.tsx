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
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useLogin } from "@/hooks";
import { FormInputWrapper } from "../atoms/FormInputWrapper";
import { LoginFormSchema } from "@/schemas/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormErrorLabel } from "../atoms/FormErrorLabel";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const login = useLogin();
  const [apiFormError, setApiFormError] = useState("");
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const onSubmit = async (e: any) => {
    const { username, password } = e;
    if (!username || !password) return;

    try {
      const res = await login({
        username,
        password,
      });

      if (res?.isError) {
        console.log(res);
        setApiFormError(res.message);
      }
    } catch (error: any) {
      // Handle login errors
      setApiFormError(error?.message || "Login failed");
    }
  };
  return (
    <div
      className={cn("max-md:h-full flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="max-md:h-full max-md:rounded-none">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 md:gap-8">
              <FormErrorLabel errMsg={apiFormError} />
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password")}
                  errMsg={errors.password?.message}
                  id="password"
                  type="password"
                  required
                />
                <FormErrorLabel errMsg={errors.password?.message} />
              </FormInputWrapper>

              <div>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="text-lg text-theme-dark-bg bg-theme-accent cursor-pointer hover:bg-theme-accent-hover"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrorLabel } from "@/components/atoms/FormErrorLabel";
import { useUsers } from "@/hooks/admin/useUsers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import type { User } from "@/types/models/User";
import { stringRegex } from "@/schemas/Regex";
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
} from "@/schemas/SchemaErrorMessages";

const EditUserSchema = z.object({
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
});

type EditUserFormData = z.infer<typeof EditUserSchema>;

interface EditUserDialogProps {
  user: User;
  onSuccess: () => void;
}

export const EditUserDialog = ({ user, onSuccess }: EditUserDialogProps) => {
  const { updateUser, isLoading } = useUsers();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>({
    defaultValues: {
      username: user.username,
      password: "",
    },
    resolver: zodResolver(EditUserSchema),
  });

  const onSubmit = async (data: EditUserFormData) => {
    try {
      await updateUser(user.id, data);
      closeButtonRef.current?.click();
      onSuccess();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username")}
              id="username"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.username?.message} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">New Password</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter new password"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.password?.message} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline" type="button" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update User"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

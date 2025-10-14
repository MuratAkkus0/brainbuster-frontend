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
import { useAuth, useUpdateProfile } from "@/hooks";
import { EditProfileFormSchema } from "@/schemas/EditProfileFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormErrorLabel } from "../atoms/FormErrorLabel";
import { useState, useRef } from "react";
import type { z } from "zod";

type EditProfileFormData = z.infer<typeof EditProfileFormSchema>;

export const EditUserInfoDialogBox = () => {
  const { user } = useAuth();
  const { updateProfile } = useUpdateProfile();
  const [isLoading, setIsLoading] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const username = user.user?.user.username;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      username: username || "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(EditProfileFormSchema),
  });

  const onSubmit = async (data: EditProfileFormData) => {
    console.log("Form submitted with data:", data);
    setIsLoading(true);

    try {
      await updateProfile({
        username: data.username,
        password: data.password,
      });

      // Reset form after successful update
      reset({
        username: data.username,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });

      // Close dialog programmatically
      closeButtonRef.current?.click();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="username">Username:</Label>
            <Input
              {...register("username")}
              id="username"
              name="username"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.username?.message} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              {...register("currentPassword")}
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Enter current password"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.currentPassword?.message} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">New Password</Label>
            <Input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.password?.message} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.confirmPassword?.message} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline" type="button" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

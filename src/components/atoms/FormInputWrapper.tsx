import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function FormInputWrapper({ className, children }: Props) {
  return (
    <>
      <div className={cn("grid gap-3", className)}>{children}</div>
    </>
  );
}

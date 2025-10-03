import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MainContainerInterface {
  children: ReactNode;
  className?: string;
}
export const MainContainer: React.FC<MainContainerInterface> = ({
  className,
  children,
}) => {
  return (
    <>
      <div
        className={cn(
          "w-full py-1 md:py-16 flex justify-center items-start bg-theme-second-bg overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

import { cn } from "@/lib/utils";
import type { HTMLAttributes, MouseEventHandler } from "react";

interface QuizChoiceProps extends HTMLAttributes<HTMLDivElement> {
  onClick: MouseEventHandler<HTMLDivElement>;
  tag: string;
  children: string;
  className?: string;
}

export const QuizChoice: React.FC<QuizChoiceProps> = ({
  onClick,
  tag,
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      onClick={onClick}
      className={cn(
        "grid grid-cols-12 grid-rows-1 border-2 items-center justify-items-center cursor-pointer",
        className
      )}
    >
      <div className="col-span-3 bg-theme-accent w-full h-full flex items-center justify-center font-bold text-2xl">
        {tag}
      </div>
      <div className="col-span-9 text-theme-main-text text-lg md:text-xl justify-self-start px-4">
        {children}
      </div>
    </div>
  );
};

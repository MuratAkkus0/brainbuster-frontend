import { cn } from "@/lib/utils";
import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import type { AppDispatch, RootState } from "@/store/store";
import { setIsLoading } from "@/store/slices/appSlice";

interface MainContainerInterface {
  children: ReactNode;
  className?: string;
}
export const MainContainer: React.FC<MainContainerInterface> = ({
  className,
  children,
}) => {
  const isLoading = useSelector((store: RootState) => store.app.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsLoading(true));

    const timeout = setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 200);

    return () => clearTimeout(timeout);
  }, [location.pathname]);
  return (
    <>
      <div
        className={cn(
          "relative w-full py-1 md:py-16 flex justify-center items-start bg-theme-second-bg overflow-y-auto",
          isLoading
            ? "opacity-0 pointer-events-none"
            : "opacity-100 transition-opacity duration-[170ms] pointer-events-auto",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

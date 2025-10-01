import type { ReactElement } from "react";

interface MainContainerInterface {
  children: ReactElement;
}
export const MainContainer: React.FC<MainContainerInterface> = ({
  children,
}) => {
  return (
    <>
      <div className="w-full h-[calc(100%-128px)] py-1 flex justify-center items-center bg-theme-second-bg ">
        {children}
      </div>
    </>
  );
};

import type { ReactNode } from "react";

interface ClassicPageLayoutInterface {
  children: ReactNode;
}
export const ClassicPageLayout: React.FC<ClassicPageLayoutInterface> = ({
  children,
}) => {
  return (
    <>
      <div className="w-full h-full grid grid-rows-12 grid-cols-1">
        {children}
      </div>
    </>
  );
};

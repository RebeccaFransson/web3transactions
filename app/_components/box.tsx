import type { ReactNode } from "react";

export const Box = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} w-[900px] h-[900px] bg-white rounded p-4 outline outline-white-transparent outline-8`}
    >
      {children}
    </div>
  );
};

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
      className={` bg-gradient-to-l from-pink-200 to-orange-500 rounded p-0.5`}
    >
      <div className={`${className} w-full bg-white rounded`}>{children}</div>
    </div>
  );
};

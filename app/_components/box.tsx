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
      className={`${className} bg-gradient-to-l from-pink-200 to-pink-600 rounded p-1`}
    >
      <div className={` w-full bg-white rounded`}>{children}</div>
    </div>
  );
};

import type { ReactNode } from "react";

export const H1 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h1 className={`${className} text-white text-6xl`}>{children}</h1>;
};

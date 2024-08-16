import type { ReactNode } from "react";

export const H1 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`${className} text-pink-600 font-bold text-4xl`}>
      {children}
    </h1>
  );
};

export const TextMedium = ({
  children,
  className,
  bold = false,
}: {
  children: ReactNode;
  className?: string;
  bold?: boolean;
}) => (
  <span
    className={`${className} ${bold ? "font-bold" : "font-normal"}  text-sm`}
  >
    {children}
  </span>
);

export const TextLarge = ({
  children,
  className,
  bold = false,
}: {
  children: ReactNode;
  className?: string;
  bold?: boolean;
}) => (
  <span
    className={`${className} ${
      bold ? "font-bold" : "font-normal"
    } text-xl sm:text-3xl`}
  >
    {children}
  </span>
);

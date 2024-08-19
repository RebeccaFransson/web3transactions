import Link from "next/link";
import type { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  className,
  onClick,
  href,
  small = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  small?: boolean;
}) => {
  const classes = `${className} ${
    small ? "py-1 px-2" : "py-2 px-4"
  }  bg-gradient-to-r from-pink-400 via-pink-600 to-pink-400 rounded text-white font-bold text-sm sm:text-base outline outline-2 outline-transparent hover:outline-pink-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300 `;
  if (href)
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  if (onClick) return <button className={classes}>{children}</button>;
  throw Error(
    "Button needs either a href(becomes a link) or a onClick(becomes a button)."
  );
};
export const SeconaryButton = ({
  children,
  className,
  onClick,
  href,
  small = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  small?: boolean;
}) => {
  const classes = `${className} ${
    small ? "py-1 px-2" : "py-2 px-4"
  } bg-pink-transparent border border-pink-300 rounded text-sm sm:text-base font-bold outline outline-transparent hover:outline-pink-transparent hover:shadow-inner shadow-pink bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300 `;
  if (href)
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  if (onClick) return <button className={classes}>{children}</button>;
  throw Error(
    "Button needs either a href(becomes a link) or a onClick(becomes a button)."
  );
};

export const TextButton = ({
  children,
  className,
  onClick,
  href,
  small = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  small?: boolean;
}) => {
  const classes = `${className} ${
    small ? "py-0.5 px-1" : "py-1 px-2"
  } flex gap-2 items-center justify-start w-fit bg-transparent transition-bg duration-300 rounded text-sm sm:text-base cursor-pointer`;
  if (href)
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  if (onClick) return <button className={classes}>{children}</button>;
  throw Error(
    "Button needs either a href(becomes a link) or a onClick(becomes a button)."
  );
};

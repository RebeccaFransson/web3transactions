import Link from "next/link";
import type { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) => {
  //hover:px-3 hover:mx-1
  const classes = `${className} bg-gradient-to-r from-pink via-orange to-pink rounded py-2 px-4 text-white font-bold outline outline-2 outline-transparent hover:outline-pink-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300 `;
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

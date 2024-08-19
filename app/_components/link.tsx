import type { ReactNode } from "react";
import NextLink from "next/link";

export const Link = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <NextLink
      target="_blank"
      href={href}
      className="cursor-pointer underline decoration-pink-900 hover:decoration-pink-800"
    >
      {children}
    </NextLink>
  );
};

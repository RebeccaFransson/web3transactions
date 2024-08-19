import type { Metadata } from "next";
import "./globals.css";
import { Contact } from "./_components/contact";
import Link from "next/link";

export const metadata: Metadata = {
  title: "web3transactions",
  description: "Created by Rebecca Fransson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <div className="relative z-20 group flex gap-10 items-center justify-between text-white font-extrabold border-b border-white-transparent py-4 px-10 bg-gradient-to-l from-pink-200 to-pink-600">
          <div className="flex gap-4 sm:gap-10 items-center flex-wrap">
            <h2>
              <Link href="/" className="cursor-pointer">
                REBECCA FRANSSON
              </Link>
            </h2>
            <Contact />
          </div>
        </div>

        <div className="flex justify-center">{children}</div>
      </body>
    </html>
  );
}

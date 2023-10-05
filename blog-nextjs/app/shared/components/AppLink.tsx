import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Route } from "next";

type AppLinkProps = Parameters<typeof Link>[0] & {
  size?: "sm" | "regular" | "lg";
  variant?: "button" | "link";
};

export default function AppLink({
  size = "regular",
  href,
  variant,
  children,
}: AppLinkProps) {
  return (
    <Link
      className={clsx(
        variant === "button" &&
          "rounded border-main text-main hover:cursor-pointer hover:border-primary hover:bg-primary hover:text-white",
        variant === "link" &&
          "&& border-b-main text-3xl font-bold text-primary decoration-primary hover:underline hover:decoration-2",

        {
          "mb-2 mt-2 border-2 p-2 text-2xl":
            variant === "button" && size === "lg",
        },
        {
          "mb-2 mt-2 border-2 p-2 text-base":
            variant === "button" && size === "regular",
        },
        {
          "mt-1 border-2 px-3 py-1 text-sm":
            variant === "button" && size === "sm",
        },
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

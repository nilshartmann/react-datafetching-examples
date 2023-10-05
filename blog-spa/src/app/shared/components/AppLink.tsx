import type { ReactNode } from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";

type AppLinkProps =  {
  href: string;
  size?: "sm" | "regular" | "lg";
  variant?: "button" | "link";
  children: React.ReactNode;
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
          "border-main text-main hover:border-primary hover:bg-primary rounded hover:cursor-pointer hover:text-white",
        variant === "link" &&
          "decoration-primary && border-b-main text-primary text-3xl font-bold hover:underline hover:decoration-2",

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
      to={href}
    >
      {children}
    </Link>
  );
}

import type { ReactNode } from "react";
import clsx from "clsx";

type HeadingProps = {
  children: ReactNode;
  className?: string;
  style?: "default" | "primary";
};
export default function H1({
  children,
  style = "default",
  className,
}: HeadingProps) {
  return (
    <h1
      className={clsx(
        `text-3xl`,
        style === "primary" &&
          "text-primary border-b-grey-3 border-b-[1px] font-bold",
        className,
      )}
    >
      {children}
    </h1>
  );
}

import type { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  size?: "sm" | "regular" | "lg";
  disabled?: boolean;

  children: ReactNode;
  onClick?: () => void;
};

export default function Button({
  size = "regular",
  disabled,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "border-main text-main hover:border-primary hover:bg-primary disabled:border-grey-2 disabled:text-grey-2 rounded hover:cursor-pointer hover:text-white disabled:hover:cursor-default disabled:hover:bg-white",
        { "mb-2 mt-2 border-2 p-2 text-base": size === "regular" },
        { "mt-1 border-2 px-3 py-1 text-sm": size === "sm" },
        { "mt-1 border-2 px-3 py-1 text-2xl": size === "lg" },
      )}
    >
      {children}
    </button>
  );
}

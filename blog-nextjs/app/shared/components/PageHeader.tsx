import { ReactNode } from "react";

type PageHeaderProps = {
  actionButton?: ReactNode;
  children: ReactNode;
};
export default function PageHeader({
  actionButton,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={
        "flex items-end justify-between border-b-4 border-b-grey-1 pb-4 text-grey-3"
      }
    >
      <h1 className={"m-0 p-0 text-3xl font-bold text-grey-3"}>{children}</h1>
      {actionButton}
    </header>
  );
}

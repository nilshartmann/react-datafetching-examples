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
        "border-b-grey-1 text-grey-3 flex items-end justify-between border-b-4 pb-4"
      }
    >
      <h1 className={"text-grey-3 m-0 p-0 text-3xl font-bold"}>{children}</h1>
      {actionButton}
    </header>
  );
}

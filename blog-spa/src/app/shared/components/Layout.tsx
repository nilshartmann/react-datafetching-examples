import { ReactNode } from "react";

type TwoColumnLayoutProps = {
  children: ReactNode;
};
export function TwoColumnLayout({ children }: TwoColumnLayoutProps) {
  return <div className={"grid grid-cols-7 gap-x-6 pt-6"}>{children}</div>;
}

type MainProps = {
  children: ReactNode;
};
export function Main({ children }: MainProps) {
  return <main className={"col-span-5"}>{children}</main>;
}

type SidebarProps = {
  children: ReactNode;
};
export function Sidebar({ children }: SidebarProps) {
  return <aside className={"col-span-2 bg-grey-1 p-2 "}>{children}</aside>;
}

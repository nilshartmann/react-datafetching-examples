import BlogContentLayout from "@/app/shared/blog/BlogContentLayout";
import React from "react";

type ContentRouteLayoutProps = { children: React.ReactNode };
export default function ContentRouteLayout({
  children,
}: ContentRouteLayoutProps) {
  return <BlogContentLayout>{children}</BlogContentLayout>;
}

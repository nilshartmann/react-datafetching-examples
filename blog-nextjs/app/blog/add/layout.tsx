import React from "react";
import BlogAddLayout from "@/app/shared/blog/BlogAddLayout";

type AddRouteLayoutProps = {
  children: React.ReactNode;
};
export default function AddRouteLayout({ children }: AddRouteLayoutProps) {
  return <BlogAddLayout>{children}</BlogAddLayout>;
}

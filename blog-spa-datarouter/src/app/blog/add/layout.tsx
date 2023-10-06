import React from "react";
import BlogAddLayout from "@/app/shared/blog/BlogAddLayout";
import { Outlet } from "react-router-dom";

export default function AddRouteLayout() {
  return (
    <BlogAddLayout>
      <Outlet />
    </BlogAddLayout>
  );
}

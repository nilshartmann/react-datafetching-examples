import BlogContentLayout from "../../shared/blog/BlogContentLayout";
import React from "react";
import { Outlet } from "react-router-dom";

export default function ContentRouteLayout() {
  return (
    <BlogContentLayout>
      <Outlet />
    </BlogContentLayout>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/app/layout.tsx";
import LandingPage from "@/app/page.tsx";
import BlogListPage from "@/app/blog/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPostPageRoute from "@/app/blog/(content)/post/[postId]/page.tsx";
import ContentRouteLayout from "@/app/blog/(content)/layout.tsx";
import BlogListRoute from "@/app/blog/page.tsx";
import BlogAddLayout from "@/app/shared/blog/BlogAddLayout.tsx";
import AddPostRoute from "@/app/blog/add/page.tsx";
import AddRouteLayout from "@/app/blog/add/layout.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "blog",
        children: [
          {
            path: "add",
            element: <AddRouteLayout />,
            children: [{ index: true, element: <AddPostRoute /> }],
          },

          {
            element: <ContentRouteLayout />,
            children: [
              { index: true, element: <BlogListRoute /> },
              { path: "post/:postId", element: <BlogPostPageRoute /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);

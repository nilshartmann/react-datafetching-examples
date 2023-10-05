import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/app/layout.tsx";
import LandingPage from "@/app/page.tsx";
import BlogListPage from "@/app/blog/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPostPageRoute from "@/app/blog/post/[postId]/page.tsx";

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
          { index: true, element: <BlogListPage /> },
          { path: "post/:postId", element: <BlogPostPageRoute /> },
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

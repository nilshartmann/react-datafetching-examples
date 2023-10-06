import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout.tsx";
import LandingPage from "./page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPostPageRoute from "./blog/(content)/post/[postId]/page.tsx";
import ContentRouteLayout from "./blog/(content)/layout.tsx";
import BlogListRoute from "./blog/page.tsx";
import AddPostRoute from "./blog/add/page.tsx";
import AddRouteLayout from "./blog/add/layout.tsx";

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

import { getBlogTeaserList } from "@/app/shared/api/backend-queries.ts";
import {
  Main,
  Sidebar,
  TwoColumnLayout,
} from "@/app/shared/components/Layout.tsx";
import AppLink from "@/app/shared/components/AppLink.tsx";
import Button from "@/app/shared/components/Button.tsx";
import PostTeaser from "@/app/shared/blog/PostTeaser.tsx";
import OrderByButton from "@/app/shared/blog/OrderByButton.tsx";
import { OrderBy } from "@/app/shared/api/types.ts";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import PageHeader from "@/app/shared/components/PageHeader.tsx";
import useBlogSearchParams from "@/app/shared/blog/useBlogSearchParams.tsx";
import BlogListPage from "@/app/shared/blog/BlogListPage.tsx";
import { Suspense } from "react";

export default function BlogListRoute() {
  const { currentOrderBy } = useBlogSearchParams();
  console.log("Render /blog");

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BlogListPage orderBy={currentOrderBy} />
    </Suspense>
  );
}

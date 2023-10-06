import { Suspense } from "react";
import useBlogSearchParams from "@/app/shared/blog/useBlogSearchParams.tsx";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import BlogListPage from "@/app/shared/blog/BlogListPage.tsx";

export default function BlogListRoute() {
  const { currentOrderBy } = useBlogSearchParams();
  console.log("Render /blog");

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BlogListPage orderBy={currentOrderBy} />
    </Suspense>
  );
}

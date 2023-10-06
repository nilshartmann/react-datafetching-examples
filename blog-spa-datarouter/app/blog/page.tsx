import LoadingIndicator from "../shared/components/LoadingIndicator.tsx";
import useBlogSearchParams from "../shared/blog/useBlogSearchParams.tsx";
import BlogListPage from "../shared/blog/BlogListPage.tsx";
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

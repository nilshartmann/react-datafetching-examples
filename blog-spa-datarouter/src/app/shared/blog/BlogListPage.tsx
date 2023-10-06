import OrderByButton from "@/app/shared/blog/OrderByButton.tsx";
import PostTeaser from "@/app/shared/blog/PostTeaser.tsx";
import { GetBlogTeaserListResponse, OrderBy } from "@/app/shared/api/types.ts";
import { useBlogListPageLoaderData } from "@/app/shared/blog/blog-loader.tsx";
import { Await } from "react-router-dom";

type BlogListPageProps = {
  orderBy: OrderBy;
};

export default function BlogListPage({ orderBy }: BlogListPageProps) {
  console.log("Render /blog", orderBy);

  const { blogTeaserListPromise } = useBlogListPageLoaderData();

  return (
    <div className={"space-y-4"}>
      <div className={"flex justify-end gap-x-4"}>
        <OrderByButton orderBy={"desc"} />
        <OrderByButton orderBy={"asc"} />
      </div>
      <Await resolve={blogTeaserListPromise}>
        {/* hmmm... type safety? */}
        {(data: GetBlogTeaserListResponse) =>
          data.posts.map((p) => <PostTeaser key={p.id} post={p} />)
        }
      </Await>
    </div>
  );
}

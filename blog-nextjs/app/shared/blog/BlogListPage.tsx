import { getBlogTeaserList } from "@/app/shared/api/backend-queries";
import OrderByButton from "@/app/shared/blog/OrderByButton";
import PostTeaser from "@/app/shared/blog/PostTeaser";
import { OrderBy } from "@/app/shared/api/types";

type BlogListPageProps = {
  orderBy: OrderBy;
};
export default async function BlogListPage({ orderBy }: BlogListPageProps) {
  console.log("Render /blog");
  const response = await getBlogTeaserList(orderBy);

  return (
    <div className={"space-y-4"}>
      <div className={"flex justify-end gap-x-4"}>
        <OrderByButton orderBy={"desc"} />
        <OrderByButton orderBy={"asc"} />
      </div>
      {response.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </div>
  );
}

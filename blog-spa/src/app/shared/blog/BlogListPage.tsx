import { getBlogTeaserList } from "@/app/shared/api/backend-queries.ts";
import PageHeader from "@/app/shared/components/PageHeader.tsx";
import AppLink from "@/app/shared/components/AppLink.tsx";
import { Main, TwoColumnLayout } from "@/app/shared/components/Layout.tsx";
import OrderByButton from "@/app/shared/blog/OrderByButton.tsx";
import PostTeaser from "@/app/shared/blog/PostTeaser.tsx";
import { OrderBy } from "@/app/shared/api/types.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

type BlogListPageProps = {
  orderBy: OrderBy;
};
export default function BlogListPage({ orderBy }: BlogListPageProps) {
  console.log("Render /blog", orderBy);
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["blog-list", orderBy],
    queryFn: () => getBlogTeaserList(orderBy),
  });

  console.log("isFetching", isFetching);

  return (
    <>
      <PageHeader
        actionButton={
          <AppLink variant={"button"} href={"/blog/add"}>
            Create new Post
          </AppLink>
        }
      >
        Blog Posts
      </PageHeader>
      <TwoColumnLayout>
        <Main>
          <div className={"space-y-4"}>
            <div className={"flex justify-end gap-x-4"}>
              <OrderByButton orderBy={"desc"} />
              <OrderByButton orderBy={"asc"} />
            </div>
            {data.posts.map((p) => (
              <PostTeaser key={p.id} post={p} />
            ))}
          </div>
        </Main>
      </TwoColumnLayout>
    </>
  );
}

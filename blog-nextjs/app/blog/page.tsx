import { getBlogTeaserList } from "@/app/shared/api/backend-queries";
import { Main, Sidebar, TwoColumnLayout } from "@/app/shared/components/Layout";
import PageHeader from "@/app/shared/components/PageHeader";
import AppLink from "@/app/shared/components/AppLink";
import Button from "@/app/shared/components/Button";
import PostTeaser from "@/app/shared/blog/PostTeaser";
import OrderByButton from "@/app/shared/blog/OrderByButton";
import { OrderBy } from "@/app/shared/api/types";

type SearchParams = {
  order_by?: OrderBy;
};

type BlogListPageProps = {
  searchParams: SearchParams;
};

export default async function BlogListPage({
  searchParams,
}: BlogListPageProps) {
  const response = await getBlogTeaserList(searchParams.order_by);

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
            {response.posts.map((p) => (
              <PostTeaser key={p.id} post={p} />
            ))}
          </div>
        </Main>
      </TwoColumnLayout>
    </>
  );
}

import { getBlogPost } from "@/app/shared/api/backend-queries";
import { Main, Sidebar, TwoColumnLayout } from "@/app/shared/components/Layout";
import PageHeader from "@/app/shared/components/PageHeader";
import AppLink from "@/app/shared/components/AppLink";
import H1 from "@/app/shared/components/Heading";
import Post from "@/app/shared/blog/Post";

type PostPageProps = {
  params: { postId: string };
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await getBlogPost(params.postId);

  if (!post) {
    return <h1>Not found :-(</h1>;
  }

  return (
    <>
      <PageHeader
        actionButton={
          <AppLink variant={"button"} href={"/"}>
            Home
          </AppLink>
        }
      >
        Home
      </PageHeader>
      <TwoColumnLayout>
        <Main>
          <Post post={post} />
        </Main>
        <Sidebar>
          <div>
            <h2 className={"text-2xl font-bold"}>Tags</h2>
            <div className={"bg-grey-1"}>JSX</div>
          </div>
        </Sidebar>
      </TwoColumnLayout>
    </>
  );
}

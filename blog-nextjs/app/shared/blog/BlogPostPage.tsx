import { getBlogPost, getComments } from "@/app/shared/api/backend-queries";
import { H1 } from "@/app/shared/components/Heading";
import PageHeader from "@/app/shared/components/PageHeader";
import AppLink from "@/app/shared/components/AppLink";
import { Main, Sidebar, TwoColumnLayout } from "@/app/shared/components/Layout";
import Post from "@/app/shared/blog/Post";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator";
import CommentList from "@/app/shared/blog/CommentList";

type BlogPostPageProps = {
  postId: string;
};

export default async function BlogPostPage({ postId }: BlogPostPageProps) {
  const commentsPromise = getComments(postId);
  const post = await getBlogPost(postId);

  if (!post) {
    return <H1>Not found 😢</H1>;
  }

  return (
    <div className={"space-y-4"}>
      <Post post={post} />
      <Suspense
        fallback={<LoadingIndicator>Comments loading...</LoadingIndicator>}
      >
        <CommentList commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}

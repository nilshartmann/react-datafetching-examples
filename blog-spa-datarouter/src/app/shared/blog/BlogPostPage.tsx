import { getBlogPost } from "@/app/shared/api/backend-queries";
import Post from "@/app/shared/blog/Post";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import { usePreFetchComments } from "@/app/shared/blog/use-fetch-comments.tsx";
import CommentList from "@/app/shared/blog/CommentList.tsx";

type BlogPostPageProps = {
  postId: string;
};

export default function BlogPostPage({ postId }: BlogPostPageProps) {
  // start early fetching of comments...
  usePreFetchComments(postId);

  const { data: post } = useSuspenseQuery({
    queryKey: ["blogpost", postId],
    queryFn: () => getBlogPost(postId),
  });

  if (!post) {
    return <h1>Not found :-(</h1>;
  }

  return (
    <div className={"space-y-4"}>
      <Post post={post} />
      <Suspense
        fallback={<LoadingIndicator>Comments loading...</LoadingIndicator>}
      >
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
}

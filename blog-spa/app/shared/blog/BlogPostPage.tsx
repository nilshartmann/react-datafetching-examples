import { getBlogPost } from "../api/backend-queries";
import Post from "./Post";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingIndicator from "../components/LoadingIndicator.tsx";
import { usePreFetchComments } from "./use-fetch-comments.tsx";
import CommentList from "./CommentList.tsx";

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

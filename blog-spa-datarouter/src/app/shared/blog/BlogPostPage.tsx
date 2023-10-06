import Post from "@/app/shared/blog/Post";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import CommentList from "@/app/shared/blog/CommentList.tsx";
import { useBlogPageLoaderData } from "@/app/shared/blog/blog-loader.tsx";
import { Await } from "react-router-dom";
import { BlogPost } from "@/app/shared/api/types.ts";

export default function BlogPostPage() {
  const { blogPromise, commentsPromise } = useBlogPageLoaderData();

  return (
    <div className={"space-y-4"}>
      <Await resolve={blogPromise}>
        {(post: BlogPost | null) =>
          post ? <Post post={post} /> : <h1>Not found :-(</h1>
        }
      </Await>

      <Suspense
        fallback={<LoadingIndicator>Comments loading...</LoadingIndicator>}
      >
        <Await resolve={commentsPromise}>
          <CommentList />
        </Await>
      </Suspense>
    </div>
  );
}

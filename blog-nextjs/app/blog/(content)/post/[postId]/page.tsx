import BlogPostPage from "@/app/shared/blog/BlogPostPage";

type BlogPostPageRouteProps = {
  params: { postId: string };
};

export default async function BlogPostPageRoute({
  params,
}: BlogPostPageRouteProps) {
  return <BlogPostPage postId={params.postId} />;
}

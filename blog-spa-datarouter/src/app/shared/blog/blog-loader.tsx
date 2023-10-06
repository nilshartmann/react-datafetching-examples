import {
  ActionFunction,
  defer,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import {
  BlogPost,
  Comment,
  GetBlogTeaserListResponse,
  OrderBy,
} from "@/app/shared/api/types.ts";
import { queryClient } from "@/query-client.ts";
import {
  getBlogPost,
  getBlogTeaserList,
  getComments,
} from "@/app/shared/api/backend-queries.ts";
import invariant from "tiny-invariant";
import { addPost } from "@/app/shared/api/server-actions.ts";

// Typesafety of loader functions: https://github.com/remix-run/remix/blob/40a4d7d5e25eb5edc9a622278ab111d881c7c155/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md

export const blogListPageLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const orderBy = (url.searchParams.get("order_by") as OrderBy) || "desc";

  return defer({
    blogTeaserListPromise: queryClient.fetchQuery({
      queryKey: ["blog-list", orderBy],
      queryFn: () => getBlogTeaserList(orderBy),
    }),
  });
};

export function useBlogListPageLoaderData() {
  const data = useLoaderData();

  return data as { blogTeaserListPromise: Promise<GetBlogTeaserListResponse> };
}

export const blogPageLoader: LoaderFunction = ({ params }) => {
  const { postId } = params;
  invariant(postId, "Param 'postId' missing in loader.");

  return defer({
    blogPromise: queryClient.fetchQuery({
      queryKey: ["blogpost", postId],
      queryFn: () => getBlogPost(postId),
    }),
    commentsPromise: queryClient.fetchQuery({
      queryKey: ["blogpost", postId, "comments"],
      queryFn: () => getComments(postId),
    }),
  });
};

export function useBlogPageLoaderData() {
  const data = useLoaderData();

  return data as {
    blogPromise: Promise<BlogPost | null>;
    commentsPromise: Promise<Comment[] | null>;
  };
}

export const addPostAction: ActionFunction = async ({ params, request }) => {
  const { title, body } = (await request.json()) as {
    title: string;
    body: string;
  };

  const result = await addPost(title, body);
  if (result.status === "success") {
    return redirect("/blog");
  }

  return result;
};

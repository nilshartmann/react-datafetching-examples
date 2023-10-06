import {
  BlogPost,
  Comment,
  GetBlogPostResponse,
  GetBlogTeaserListResponse,
  GetCommentsResponse,
  GetTagsResponse,
  OrderBy,
} from "./types";
import { micromark } from "micromark";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const getTagsSlowdown = ``; // `?slowDown=2400`;
const getBlogTeaserListSlowdown = ``; // `&slowDown=1600`
const getBlogPostSlowdown = ``; // `?slowDown=2400`
const getCommentsSlowdown = ``; // `?slowDown=2400`

// ---------------------------------------------------------------------------------------------------
// -- getTags
// ---------------------------------------------------------------------------------------------------
export async function getTags(): Promise<GetTagsResponse> {
  console.log("Starting fetch tags from external backend service");
  const r = await fetch(`http://localhost:7002/tags${getTagsSlowdown}`);

  const json = await r.json();
  return GetTagsResponse.parse(json);
}

// ---------------------------------------------------------------------------------------------------
// -- getBlogTeaserList
// ---------------------------------------------------------------------------------------------------

export async function getBlogTeaserList(orderBy: OrderBy = "desc") {
  console.log("Starting fetch to external backend service");
  const r = await fetch(
    `http://localhost:7002/posts?teaser&order_by=${encodeURIComponent(
      orderBy,
    )}${getBlogTeaserListSlowdown}`,
  );

  console.log(
    "Fetch request to external backend service returned timestamp",
    r.headers.get("x-backend-started-at"),
  );
  const json = await r.json();
  return GetBlogTeaserListResponse.parse(json);
}

// ---------------------------------------------------------------------------------------------------
// -- getBlogPost
// ---------------------------------------------------------------------------------------------------

export async function getBlogPost(postId: string): Promise<BlogPost | null> {
  console.log(`Starting backend request for blog post with id ${postId}`);

  const r = await fetch(
    `http://localhost:7002/posts/${postId}${getBlogPostSlowdown}`,
  );

  if (r.status === 404) {
    return null;
  }

  const json = await r.json();
  const post = GetBlogPostResponse.parse(json).post;
  const bodyHtml = micromark(post.bodyMarkdown);
  return { ...post, bodyHtml };
}

// ---------------------------------------------------------------------------------------------------
// -- getComments
// ---------------------------------------------------------------------------------------------------

export async function getComments(postId: string): Promise<Comment[] | null> {
  console.log(`Starting backend request for comments with postId ${postId}`);

  const r = await fetch(
    `http://localhost:7002/posts/${postId}/comments${getCommentsSlowdown}`,
  );

  if (r.status === 404) {
    return null;
  }

  const json = await r.json();
  const comments = GetCommentsResponse.parse(json).comments;
  return comments;
}

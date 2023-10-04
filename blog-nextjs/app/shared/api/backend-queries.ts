import {
  BlogPost,
  GetBlogPostResponse,
  GetBlogTeaserListResponse,
  OrderBy,
} from "@/app/shared/api/types";
import { micromark } from "micromark";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const getBlogTeaserListSlowdown = ``; // `&slowDown=1600`
const getBlogPostslowdown = ``; // `?slowDown=2400`

// ---------------------------------------------------------------------------------------------------
// -- getBlogTeaserList
// ---------------------------------------------------------------------------------------------------

export async function getBlogTeaserList(orderBy: OrderBy = "desc") {
  console.log("Get Blog Teaser list");
  const r = await fetch(
    `http://localhost:7002/posts?teaser&order_by=${encodeURIComponent(
      orderBy,
    )}${getBlogTeaserListSlowdown}`,
    {
      next: {
        tags: ["teaser"],
      },
    },
  );
  const json = await r.json();
  return GetBlogTeaserListResponse.parse(json);
}

// ---------------------------------------------------------------------------------------------------
// -- getBlogPost
// ---------------------------------------------------------------------------------------------------

export async function getBlogPost(postId: string): Promise<BlogPost | null> {
  const r = await fetch(
    `http://localhost:7002/posts/${postId}${getBlogPostslowdown}`,
  );

  if (r.status === 404) {
    return null;
  }

  const json = await r.json();
  const post = GetBlogPostResponse.parse(json).post;
  const bodyHtml = micromark(post.bodyMarkdown);
  return { ...post, bodyHtml };
}

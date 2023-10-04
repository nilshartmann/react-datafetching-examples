import { z } from "zod";

export const Comment = z.object({
  id: z.string(),
  postId: z.string(),
  comment: z.string(),
});

// ---------------------------------------------------------------------------------------------------
// -- Blog Post Teaser
// ---------------------------------------------------------------------------------------------------

export const BlogPostTeaser = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  teaser: z.string(),
  newestComment: Comment.nullish(),
});

export type BlogPostTeaser = z.infer<typeof BlogPostTeaser>;

export type OrderBy = "desc" | "asc";

export const GetBlogTeaserListResponse = z.object({
  posts: BlogPostTeaser.array(),
});

// ---------------------------------------------------------------------------------------------------
// -- Blog Post
// ---------------------------------------------------------------------------------------------------

export const RawBlogPost = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  bodyMarkdown: z.string(),
});
export type RawBlogPost = z.infer<typeof RawBlogPost>;

export const BlogPost = RawBlogPost.extend({
  bodyHtml: z.string(),
});

export type BlogPost = z.infer<typeof BlogPost>;

export const GetBlogPostResponse = z.object({
  post: RawBlogPost,
});

// ---------------------------------------------------------------------------------------------------
// -- AddPostResponse
// ---------------------------------------------------------------------------------------------------
export const AddPostResponse = z.object({
  newPost: RawBlogPost,
});

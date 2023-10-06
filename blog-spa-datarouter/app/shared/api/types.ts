import { z } from "zod";

// ---------------------------------------------------------------------------------------------------
// -- Tags
// ---------------------------------------------------------------------------------------------------
const Tag = z.object({
  name: z.string(),
  count: z.number(),
});

export type Tag = z.infer<typeof Tag>;

export const GetTagsResponse = z.object({
  tags: Tag.array(),
  generatedAt: z.string(),
});

export type GetTagsResponse = z.infer<typeof GetTagsResponse>;

// ---------------------------------------------------------------------------------------------------
// -- Comments
// ---------------------------------------------------------------------------------------------------
export const Comment = z.object({
  id: z.string(),
  postId: z.string(),
  comment: z.string(),
  username: z.string(),
});

export type Comment = z.infer<typeof Comment>;

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

export type GetBlogTeaserListResponse = z.infer<
  typeof GetBlogTeaserListResponse
>;

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

export type GetBlogPostResponse = z.infer<typeof GetBlogPostResponse>;

// ---------------------------------------------------------------------------------------------------
// -- GetComments
// ---------------------------------------------------------------------------------------------------
export const GetCommentsResponse = z.object({
  comments: Comment.array(),
});

export type GetCommentsResponse = z.infer<typeof GetCommentsResponse>;

// ---------------------------------------------------------------------------------------------------
// -- AddPostResponse
// ---------------------------------------------------------------------------------------------------
export const AddPostResponse = z.object({
  newPost: RawBlogPost,
});

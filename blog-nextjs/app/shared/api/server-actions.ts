"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { AddPostResponse, BlogPost, RawBlogPost } from "@/app/shared/api/types";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const addCommentSlowdown = ``; // `?slowDown=2400`
const addPostSlowdown = ``; // `?slowDown=2400`

type ActionErrorResponse = {
  status: "error";
  err: unknown;
};

type ActionSuccessResponse = {
  status: "success";
};

export type ActionResponse<T> = ActionErrorResponse | ActionSuccessResponse;

// ---------------------------------------------------------------------------------------------------
// -- AddComment
// ---------------------------------------------------------------------------------------------------
//
// type AddCommentRequestBody = {
//   name: string;
//   comment: string;
// };
//
// export type SaveCommentForPostResponse =
//   | {
//       status: "success";
//     }
//   | {
//       status: "error";
//       err: unknown;
//     };
//
// export async function saveCommentForPost(
//   postId: string,
//   newComment: AddCommentRequestBody,
// ): Promise<SaveCommentForPostResponse> {
//   // THIS RUNS ON SERVER!
//   // Next is here "Backend-for-frontend"
//   // Imagine, we would have to add auth or api keys
//   // here for the request to the "real" comment service
//
//   const response = await fetch(
//     `http://localhost:8081/api/comments/${postId}${addCommentSlowdown}`,
//     {
//       method: "POST",
//       body: JSON.stringify(newComment),
//       headers: { "content-type": "application/json" },
//       cache: "no-cache",
//     },
//   );
//   if (!response.ok) {
//     const err = await response.json();
//     console.log("ERR", err);
//     return { status: "error", err } as const;
//   }
//
//   revalidatePath(`/post/${postId}`);
//
//   return { status: "success" } as const;
// }

// ---------------------------------------------------------------------------------------------------
// -- Add new Post
// ---------------------------------------------------------------------------------------------------
export async function addPost(
  title: string,
  body: string,
): Promise<ActionResponse<never>> {
  console.log(
    "Received request for new post with title",
    title,
    "and body",
    body,
  );
  // THIS RUNS ON SERVER!
  // Next is here "Backend-for-frontend"
  const response = await fetch(
    `http://localhost:7002/posts${addPostSlowdown}`,
    {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "content-type": "application/json" },
      cache: "no-cache",
    },
  );

  if (!response.ok) {
    const err = await response.json();
    console.error("addPost failed", err);
    return { status: "error", err };
  }
  const json = await response.json();

  if (!AddPostResponse.safeParse(json).success) {
    return { status: "error", err: "Could not parse result" };
  }

  revalidateTag("teaser");

  // revalidatePath does not work 😢
  // revalidatePath(`/blog`);

  return { status: "success" };
}

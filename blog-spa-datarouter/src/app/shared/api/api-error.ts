import { z } from "zod";
// ---------------------------------------------------------------------------------------------------
// -- ApiError Response for failed Api Requests
// ---------------------------------------------------------------------------------------------------
const ApiError = z.object({
  msg: z.string(),
});

type ApiError = z.infer<typeof ApiError>;

export function isApiError(e: unknown): e is ApiError {
  return ApiError.safeParse(e).success;
}

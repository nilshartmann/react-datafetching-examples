import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getComments } from "@/app/shared/api/backend-queries.ts";

export function usePreFetchComments(postId: string) {
  // https://github.com/TanStack/query/issues/6108#issuecomment-1750204876

  const queryClient = useQueryClient();

  // Runs in render, doesn't fetch if there's already data
  // so should not have observable side effects?
  queryClient.ensureQueryData({
    queryKey: ["blogpost", postId, "comments"],
    queryFn: () => getComments(postId),
  });
}

export function useFetchComments(postId: string) {
  return useSuspenseQuery({
    queryKey: ["blogpost", postId, "comments"],
    queryFn: () => getComments(postId),
  });
}

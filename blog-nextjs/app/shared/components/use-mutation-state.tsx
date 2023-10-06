import { useCallback, useState } from "react";
import { ActionResponse } from "@/app/shared/api/server-actions";

type ResponseState<ApiResponseType> =
  | {
      isLoading?: false;
      isSuccess?: false;
      isError?: false;
    }
  | {
      isLoading: true;
      isSuccess?: false;
      isError?: false;
    }
  | {
      isLoading?: false;
      isError?: false;
      isSuccess: true;
      data: ApiResponseType;
    }
  | {
      isError: true;
      isLoading?: false;
      isSuccess?: false;
      err: unknown;
    };

const emptyState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
} as const;

export function useMutationState<
  ApiResponseType extends ActionResponse<any>,
>() {
  const [state, setState] =
    useState<ResponseState<ApiResponseType>>(emptyState);

  const run = useCallback(async function <
    T extends (...args: any) => Promise<ApiResponseType>,
  >(fn: T): Promise<ApiResponseType> {
    const requestSucceed = (result: ApiResponseType) =>
      setState({
        isSuccess: true,
        data: result,
      });

    const requestFailed = (err: unknown) =>
      setState({
        isError: true,
        err,
      });

    setState({
      isLoading: true,
    });

    const result = await fn();
    if (result.status === "error") {
      requestFailed(result.err);
    } else if (result.status === "success") {
      requestSucceed(result);
    }
    return result;
  }, []);

  const reset = useCallback(() => setState(emptyState), []);

  return {
    state,
    run,
    reset,
  } as const;
}

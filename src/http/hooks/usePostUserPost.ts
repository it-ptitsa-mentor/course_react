import { useCallback } from "react";
import { useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

export interface SubmitResponse {
  id: number;
  title: string;
  body: string;
}

interface Props {
  title: string;
  body: string;
}

export function usePostUserPost() {
  const { request: coreRequest, ...api } = useRequest();

  const request = useCallback(
    async ({ title, body }: Props) => {
      const response = await coreRequest<SubmitResponse>({
        method: "POST",
        url: apiPaths.posts.create(),
        body: { title, body },
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}

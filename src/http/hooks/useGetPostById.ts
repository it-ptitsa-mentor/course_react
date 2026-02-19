import { useCallback } from "react";
import { Post } from "../../pages/Post";
import { useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface Props {
  postId: string | number;
}

export function useGetPostById() {
  const { request: coreRequest, ...api } = useRequest();

  const request = useCallback(
    async (props: Props) => {
      const response = await coreRequest<Post>({
        method: "GET",
        url: apiPaths.post.get(props.postId),
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}

import { useCallback } from "react";
import { Post } from "../../pages/Post";
import { useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface Props {
  search?: string;
}

export function useGetAllPosts() {
  const { request: coreRequest, ...api } = useRequest();

  const request = useCallback(
    async (props: Props) => {
      const response = await coreRequest<Post[]>({
        method: "GET",
        url: apiPaths.posts.get(),
        params: { q: props.search },
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}

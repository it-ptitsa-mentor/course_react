import { useCallback } from "react";
import { Comment } from "../../pages/Comments";
import { useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface Props {
  postId: string | number;
}

export function useGetCommentsForPost() {
  const { request: coreRequest, ...api } = useRequest();

  const request = useCallback(
    async (props: Props) => {
      const response = await coreRequest<Comment[]>({
        method: "GET",
        url: apiPaths.postComments.get(props.postId),
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}

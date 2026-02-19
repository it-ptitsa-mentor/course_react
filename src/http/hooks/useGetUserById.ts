import { useCallback } from "react";
import { useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";
import { User } from "./useGetAllUsers";

interface Props {
  userId: string | number;
}

export function useGetUserById() {
  const { request: coreRequest, ...api } = useRequest();

  const request = useCallback(
    async (props: Props) => {
      const response = await coreRequest<User>({
        method: "GET",
        url: apiPaths.user.get(props.userId),
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}

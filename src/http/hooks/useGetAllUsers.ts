import { useCallback } from "react";
import { useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export function useGetAllUsers() {
  const { request: coreRequest, ...api } = useRequest();

  const request = useCallback(async () => {
    const response = await coreRequest<User[]>({
      method: "GET",
      url: apiPaths.users.get(),
    });

    return response;
  }, [coreRequest]);

  return { ...api, request };
}

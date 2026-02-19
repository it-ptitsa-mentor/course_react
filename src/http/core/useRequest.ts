import { useCallback, useState } from "react";
import { addParamsToUrl } from "./addParamsToUrl";

const conf = {
  base_url: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
};

interface ReqestProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  body?: Record<string, unknown>;
  params?: Record<string, string | number | undefined>;
}

interface RequestResponse<D> {
  data: D | null;
  error: string | null;
}

export function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const request = useCallback(async <D>(props: ReqestProps): Promise<RequestResponse<D>> => {
    setIsLoading(true);
    setError("");

    try {
      let url = conf.base_url + props.url;
      if (props.params) url += addParamsToUrl({ params: props.params });

      const body = JSON.stringify(props.body);

      const response = await fetch(url, { method: props.method, body, headers: conf.headers });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data: D = await response.json();
      return { data, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      return { data: null, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    clearError,
    isLoading,
    error,
    request,
  };
}

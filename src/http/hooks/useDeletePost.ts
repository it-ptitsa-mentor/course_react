import { useCallback, useState } from "react";
import { addRemovedPost } from "../../utils/storage/removedPostsAPI";

export function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback((postID: number): Promise<{ removedID: number }> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      const ontimeout = () => {
        addRemovedPost(postID);
        setIsLoading(false);
        resolve({ removedID: postID });
      };

      setTimeout(ontimeout, 1500);
    });
  }, []);

  return { isLoading, request };
}

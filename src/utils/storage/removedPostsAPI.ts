import { StorageKeys } from "../../components/configs/storageKeys";

const key = StorageKeys.REMOVED_POSTS_IDS;
const storage = sessionStorage;

/** Добавить ID удаленного поста */
export function addRemovedPost(postId: number) {
  const exist: string[] = JSON.parse(storage.getItem(key) ?? "[]");
  const next = exist.concat(String(postId));
  storage.setItem(key, JSON.stringify(next));
}

/** Получить все ID удаленных постов */
export function getRemovedPostsIds() {
  const exist: string[] = JSON.parse(storage.getItem(key) ?? "[]");
  return exist.map(Number);
}

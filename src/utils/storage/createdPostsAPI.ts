import { StorageKeys } from "../../components/configs/storageKeys";
import { Post } from "../../pages/Post";

const key = StorageKeys.CREATED_POSTS;
const storage = sessionStorage;

/** Создать пост пользователя */
export function createUserPost({ userPost }: { userPost: Post }) {
  const exist: Post[] = JSON.parse(storage.getItem(key) ?? "[]");
  const next = exist.concat(userPost);
  storage.setItem(key, JSON.stringify(next));
}

/** Получить все посты пользователя */
export function getUserPosts() {
  const exist: Post[] = JSON.parse(storage.getItem(key) ?? "[]");
  return exist;
}

/** Удалить пост пользователя */
export function removeUserPost({ userPostId }: { userPostId: number }) {
  const exist: Post[] = JSON.parse(storage.getItem(key) ?? "[]");
  const next = exist.filter((p) => p.id !== userPostId);
  storage.setItem(key, JSON.stringify(next));
}

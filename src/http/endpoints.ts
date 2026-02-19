export const apiPaths = {
  posts: {
    create: () => "/posts",
    get: () => "/posts",
  },
  postComments: {
    get: (id: string | number) => `/posts/${id}/comments`,
  },
  post: {
    get: (id: string | number) => `/posts/${id}`,
  },
  user: {
    get: (id: string | number) => `/users/${id}`,
  },
  users: {
    get: () => "/users",
  },
};

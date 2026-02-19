import * as react from "@testing-library/react";

import { Post } from "../../../pages/Post";
import PostCard from "./PostCard";

const mockPost: Post = {
  id: 1,
  title: "Test Post",
  body: "This is a very long test post body that definitely exceeds the fifty character limit and should be truncated",
  userId: 1,
};

const testUser = {
  name: "Test User",
  address: "123 Main St, Anytown, USA",
};

describe("PostCard", () => {
  it("должен отрендерить title", () => {
    react.render(
      <PostCard
        post={mockPost}
        userName={testUser.name}
        userAddress={testUser.address}
        onDelete={() => {}}
      />,
    );

    expect(react.screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it("теперь должен отрендериться body с обрезкой текста", () => {
    react.render(
      <PostCard
        post={mockPost}
        userName={testUser.name}
        userAddress={testUser.address}
        onDelete={() => {}}
      />,
    );

    expect(
      react.screen.getByText(/This is a very long test post/),
    ).toBeInTheDocument();

    expect(react.screen.queryByText(mockPost.body)).not.toBeInTheDocument();
  });

  it("должен вызваться коллбек при нажатии на кнопку onDelete", () => {
    const onDelete = vi.fn();

    react.render(
      <PostCard
        post={mockPost}
        userName={testUser.name}
        userAddress={testUser.address}
        onDelete={onDelete}
      />,
    );

    const deleteButton = react.screen.getByRole("button", {
      name: "Delete post",
    });

    react.fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

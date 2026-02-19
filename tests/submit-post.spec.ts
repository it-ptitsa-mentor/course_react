import test, { expect } from "@playwright/test";

test.describe("Создание поста", () => {
  test("нельзя отправить пустую форму", async ({ page }) => {
    await page.goto("/submit");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Post submitted!")).not.toBeVisible();
  });

  test("пользователь создаёт пост и видит его в разделе Мои посты", async ({
    page,
  }) => {
    await page.goto("/submit");

    const titleInput = page.getByPlaceholder("Title");
    const bodyInput = page.getByPlaceholder("Post content");

    await titleInput.fill("E2E тестовый пост");
    await bodyInput.fill("Текст созданный из теста");

    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText("Post submitted!")).toBeVisible();

    await expect(titleInput).toHaveValue("");
    await expect(bodyInput).toHaveValue("");

    const postLink = page.getByRole("link", { name: /ID:/ });
    await expect(postLink).toBeVisible();
    await postLink.click();

    await expect(page).toHaveURL(/tab=my/);
    await expect(page.getByText("E2E тестовый пост")).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";

test("performs a calculation, clears, and starts a new calculation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Calculator" }),
  ).toBeVisible();

  const display = page.getByLabel("Calculator display");
  await expect(display).toHaveText("0");

  await page.getByRole("button", { name: "Digit 1" }).click();
  await page.getByRole("button", { name: "Digit 2" }).click();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Digit 7" }).click();
  await page.getByRole("button", { name: "Equals" }).click();
  await expect(display).toHaveText("19");

  await page.getByRole("button", { name: "Clear or reset" }).click();
  await expect(display).toHaveText("0");

  await page.getByRole("button", { name: "Digit 5" }).click();
  await page.getByRole("button", { name: "Multiply" }).click();
  await page.getByRole("button", { name: "Digit 6" }).click();
  await page.getByRole("button", { name: "Equals" }).click();
  await expect(display).toHaveText("30");
});

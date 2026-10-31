import { expect, test } from '@playwright/test'

test('home shows a visible h1', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1').first()).toBeVisible()
})

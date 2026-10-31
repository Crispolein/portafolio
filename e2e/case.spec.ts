import { expect, test } from '@playwright/test'

test('featured card opens the case without a full reload, focuses h1 and back returns home', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    ;(window as unknown as { __marker: boolean }).__marker = true
  })
  await page.locator('a[href="/proyectos/cv-optimizer"]').first().click()
  await expect(page).toHaveURL(/\/proyectos\/cv-optimizer$/)
  await expect(page.locator('h1')).toBeFocused()
  expect(await page.evaluate(() => (window as unknown as { __marker?: boolean }).__marker)).toBe(true)

  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('#projects')).toBeVisible()
})

test('direct load of /proyectos/job-hunter works', async ({ page }) => {
  await page.goto('/proyectos/job-hunter')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('h1')).not.toBeEmpty()
})

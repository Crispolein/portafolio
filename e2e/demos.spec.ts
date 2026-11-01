import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const newSlugs = ['gps-analyzer', 'pokemontcgai', 'project-hub']
const allSlugs = ['cv-optimizer', 'job-hunter', ...newSlugs]

test('a new case is reachable from the rail of another case', async ({ page }) => {
  await page.goto('/proyectos/cv-optimizer')
  await page.locator('nav a[href="/proyectos/project-hub"]').click()
  await expect(page).toHaveURL(/\/proyectos\/project-hub$/)
  await expect(page.locator('h1')).toBeFocused()
})

test('lightbox opens with Enter, closes with Escape and returns focus', async ({ page }) => {
  await page.goto('/')
  const row = page.locator('#projects li button').first()
  await row.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(row).toBeFocused()
})

for (const slug of newSlugs) {
  test(`axe: no serious or critical violations on /proyectos/${slug}`, async ({ page }) => {
    await page.goto(`/proyectos/${slug}`)
    await expect(page.locator('h1').first()).toBeVisible()
    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
  })
}

test.describe('mobile 390', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  for (const slug of allSlugs) {
    test(`no horizontal overflow on /proyectos/${slug}`, async ({ page }) => {
      await page.goto(`/proyectos/${slug}`)
      await expect(page.locator('h1')).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})

test('every /shots/ image src responds 200', async ({ page, request }) => {
  const srcs = new Set<string>()
  for (const path of ['/', ...allSlugs.map((s) => `/proyectos/${s}`)]) {
    await page.goto(path)
    const found = await page.locator('img[src^="/shots/"]').evaluateAll((els) => els.map((e) => e.getAttribute('src')!))
    found.forEach((s) => srcs.add(s))
  }
  // images that only render inside the lightbox
  await page.goto('/')
  await page.locator('#projects li button').first().click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  const inDialog = await dialog.locator('img[src^="/shots/"]').evaluateAll((els) => els.map((e) => e.getAttribute('src')!))
  inDialog.forEach((s) => srcs.add(s))
  expect(srcs.size).toBeGreaterThan(0)
  for (const src of srcs) {
    const res = await request.get(src)
    expect(res.status(), src).toBe(200)
    // vite preview falls back to index.html for missing files, so status alone proves nothing
    expect(res.headers()['content-type'], src).toMatch(/^image\//)
  }
})

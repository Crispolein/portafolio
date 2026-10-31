import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
]

for (const vp of viewports) {
  test.describe(`home ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test('no horizontal overflow on /', async ({ page }) => {
      await page.goto('/')
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })

    test('no horizontal overflow on both cases', async ({ page }) => {
      for (const slug of ['cv-optimizer', 'job-hunter']) {
        await page.goto(`/proyectos/${slug}`)
        await expect(page.locator('h1')).toBeVisible()
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
        expect(overflow, slug).toBeLessThanOrEqual(0)
      }
    })
  })
}

test.describe('home behavior', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('first Tab reaches the skip link', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.locator('a[href="#main"]')
    await expect(skip).toBeFocused()
  })

  test('ArrowRight moves the checked console radio', async ({ page }) => {
    await page.goto('/')
    const radios = page.getByRole('radio')
    await radios.first().focus()
    await expect(radios.nth(0)).toHaveAttribute('aria-checked', 'true')
    await page.keyboard.press('ArrowRight')
    await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true')
    await expect(radios.nth(0)).toHaveAttribute('aria-checked', 'false')
  })

  test('language toggle switches to English', async ({ page }) => {
    await page.goto('/')
    await page.locator('header').getByRole('button', { name: /inglés/i }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('reduced motion disables pipeline animation', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })
    const page = await context.newPage()
    await page.goto('/')
    const packet = page.locator('.pipe-packet').first()
    await expect(packet).toBeVisible()
    const styles = await page.evaluate(() =>
      [...document.querySelectorAll('.pipe-packet, .pipe-end')].map((el) => {
        const s = getComputedStyle(el)
        return { name: s.animationName, duration: s.animationDuration }
      }),
    )
    expect(styles.length).toBeGreaterThan(0)
    for (const s of styles) {
      expect(s.name === 'none' || parseFloat(s.duration) === 0).toBe(true)
    }
    await context.close()
  })

  async function fillForm(page: import('@playwright/test').Page) {
    await page.locator('input[name="name"]').fill('Ana')
    await page.locator('input[name="email"]').fill('ana@example.com')
    await page.locator('textarea[name="message"]').fill('Hola')
    await page.locator('form button[type="submit"]').click()
  }

  test('contact form shows success on 200', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 200, json: { ok: true } }))
    await page.goto('/')
    await fillForm(page)
    await expect(page.getByRole('status').filter({ hasText: /enviado/i })).toBeVisible()
  })

  test('contact form shows error on 500', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 500, json: { ok: false } }))
    await page.goto('/')
    await fillForm(page)
    await expect(page.getByRole('alert')).toBeVisible()
  })
})

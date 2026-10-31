import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const path of ['/', '/proyectos/cv-optimizer', '/proyectos/job-hunter']) {
  test(`axe: no serious or critical violations on ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('h1').first()).toBeVisible()
    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
  })
}

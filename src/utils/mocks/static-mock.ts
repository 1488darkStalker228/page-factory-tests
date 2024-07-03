import { Page } from '@playwright/test'

export default async function mockStaticRecourses(page: Page) {
  await page.route('**/*.{ico,png,jpg,mp3,woff,woff2}', (route) => route.abort())
}

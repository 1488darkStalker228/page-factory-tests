import { Page } from '@playwright/test'

export default async function getCmsAccessToken(page: Page): Promise<string> {
  return `Bearer ${
    JSON.parse(
      await page.evaluate(
        'window.localStorage.getItem("oidc.user:https://sso-test.cubicservice.ru:DefaultClient")'
      )
    ).access_token
  }`
}

import test, { expect, Page } from '@playwright/test'
import AppSidebar from '../../components/App/AppSidebar'

export default abstract class BasePage {
  readonly appSidebar: AppSidebar

  public constructor(readonly page: Page) {
    this.appSidebar = new AppSidebar(page)
  }

  public async goto(url: string) {
    await test.step(`Перейти по адресу "${url}"`, async () => {
      await this.page.goto(url, { waitUntil: 'networkidle' })
    })
  }

  public async reload() {
    await test.step(`Reloading page with url "${this.page.url()}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' })
    })
  }

  public async checkUrl(expectedUrl: string) {
    await test.step(`Страница должна содержать url "${expectedUrl}"`, async () => {
      await expect(this.page).toHaveURL(new RegExp(expectedUrl))
    })
  }
}

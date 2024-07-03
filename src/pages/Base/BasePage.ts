import test, { Page } from '@playwright/test'
import AppSidebar from '../../components/App/AppSidebar'

//Страница для обёртки базовых методов. Нужно для создания более красивого отчёта;
export default abstract class BasePage {
  readonly appSidebar: AppSidebar

  protected constructor(readonly page: Page) {
    this.appSidebar = new AppSidebar(page)
  }

  public async visit(url: string) {
    await test.step(`Opening the url "${url}"`, async () => {
      await this.page.goto(url, { waitUntil: 'networkidle' })
    })
  }

  public async reload() {
    await test.step(`Reloading page with url "${this.page.url()}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' })
    })
  }
}

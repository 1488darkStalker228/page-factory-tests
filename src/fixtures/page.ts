import test, { Fixtures, Page } from '@playwright/test'
import mockStaticRecourses from '../utils/mocks/static-mock'
import AuthorizationPage from '../pages/Authorization/AuthorizationPage'

export type ExtendedPageFixture = {
  page: Page
}

export const extendedPageFixture: Fixtures<ExtendedPageFixture> = {
  async page({ page }, use) {
    await test.step('Блокировка загрузки статических ресурсов', async () => {
      await mockStaticRecourses(page)
    })
    await test.step('Авторизация', async () => {
      await new AuthorizationPage(page).authorization({
        login: 'Kakayanaxuypoct@yandex.ru',
        password: '14881337xX!'
      })
    })
    await use(page)
  }
}

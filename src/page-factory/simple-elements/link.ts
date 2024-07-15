import BaseElement from './base-element'
import test, { expect } from '@playwright/test'

export default class Link extends BaseElement {
  get typeOf(): string {
    return 'link'
  }

  public async checkUrl(expectedUrl: string) {
    await test.step('Проверка ссылки. Нормальный текст пока не придумал', async () => {
      await expect(this.page, `ER: Page has url ${expectedUrl}`).toHaveURL(new RegExp(expectedUrl))
    })
  }
}

import test, { expect, Locator } from '@playwright/test'
import BaseElement from './base-element'
import { getRandomString } from '../../utils/get-randon'

export default class Input extends BaseElement {
  public get typeOf(): string {
    return 'Инпут'
  }

  public async fill(value: string = getRandomString()) {
    //Заполнение Инпут "search input on players list page" значением "Валюе";
    await test.step(`Заполнение ${this.typeOf} "${this.elementName}" значением "${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(async () => {
        await locator.fill(value)
        await this.checkValue(value)
      }).toPass()
    })
  }

  //Здесь он почему-то не вызывает кастомное сообщение;
  public async checkValue(value: string) {
    //Инпут "search input on players list page" должен иметь значение "Валюе";
    await test.step(`${this.typeOf} "${this.elementName}" должен иметь значение "${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator).toHaveValue(value)
    })
  }

  public async getValue(): Promise<string> {
    return await this.getLocator().inputValue()
  }
}

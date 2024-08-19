import test, { expect, Locator } from '@playwright/test'
import BaseElement from './base-element'
import { getRandomString } from '@utils/get-randon'

export default class Input extends BaseElement {
  public get typeOf(): string {
    return 'инпут'
  }

  public async fill(value: string = getRandomString()) {
    //Заполнение Инпут "search input on players list page" значением "Валюе";
    await test.step(`Заполнение ${this.typeOf}а "${this.name}" значением "${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(
        async () => {
          await locator.fill(value)
          await this.checkValue(value)
        },
        { message: this.getErrorMessage(`не заполняется`) }
      ).toPass({ timeout: 10000 })
    })
  }

  public async checkValue(value: string) {
    //Инпут "search input on players list page" должен иметь значение "Валюе";
    await test.step(`${this.capitalizeFirstLetter(this.typeOf)} "${this.name}" должен иметь значение "${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator, this.getErrorMessage(`не имеет значения "${value}"`)).toHaveValue(value)
    })
  }

  public async getValue(): Promise<string> {
    return await this.getLocator().inputValue()
  }
}

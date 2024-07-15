import test, { expect, Locator } from '@playwright/test'
import { SelectorProps } from '../../types/page-factory/base-element'
import BaseElement from './base-element'
import { getRandomString } from '../../utils/get-randon'

export default class Input extends BaseElement {
  get typeOf(): string {
    return 'input'
  }

  public async fill(value: string = getRandomString()) {
    await test.step(`Fill ${this.typeOf} "${this.componentName}" to value "${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(async () => {
        await locator.fill(value)
        await this.checkValue(value)
      }).toPass()
    })
  }

  public async checkValue(value: string) {
    await test.step(`Checking that ${this.typeOf} "${this.componentName}" has a value "${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator).toHaveValue(value)
    })
  }
}

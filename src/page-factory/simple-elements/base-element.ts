import { expect, Locator, Page, test } from '@playwright/test'
import { BaseElementProps } from '../../types/page-factory/base-element'

type ElementAttribute = { name: string; value: string }

export default abstract class BaseElement {
  private readonly page: Page
  private readonly selector: string
  private readonly name: string | undefined
  private readonly searchIn: Locator | undefined

  public constructor({ page, selector, name, searchIn }: BaseElementProps) {
    this.page = page
    this.selector = selector
    this.name = name
    this.searchIn = searchIn
  }

  public getLocator(): Locator {
    if (this.searchIn) {
      return this.searchIn.locator(this.selector)
    } else {
      return this.page.locator(this.selector)
    }
  }

  public get typeOf(): string {
    return 'Базовый элемент'
  }

  public get elementName(): string {
    if (!this.name) {
      throw Error('Укажите свойство "name" для использования "elementName"')
    }
    return this.name
  }

  private getErrorMessage(action: string): string {
    //Инпут с названием "search input on players list page" и селектором [class="ui-input__element"] не отображается/не содержит нужный текст и т.д;
    return `${this.typeOf} с названием "${this.elementName}" и селектором ${this.selector} ${action}`
  }

  public async checkVisible() {
    //Инпут "search input on players list page" должен отображаться на странице;
    await test.step(`${this.typeOf} "${this.elementName}" должен отображаться на странице`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator, {
        message: this.getErrorMessage('не отображается')
      }).toBeVisible()
    })
  }

  public async checkHide() {
    //Инпут "search input on players list page" не должен отображаться на странице;
    await test.step(`${this.typeOf} "${this.elementName}" не должен отображаться на странице`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator, {
        message: this.getErrorMessage('отображается')
      }).toBeHidden()
    })
  }

  public async checkContainText(text: string) {
    //Инпут "search input on players list page" должен содержать текст "Текст";
    await test.step(`${this.typeOf} "${this.elementName}" должен содержать текст "${text}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator, {
        message: this.getErrorMessage(`не содержит текста "${text}"`)
      }).toContainText(text)
    })
  }

  public async checkHaveText(text: string) {
    //Инпут "search input on players list page" должен иметь текст "Текст";
    await test.step(`${this.typeOf} "${this.elementName}" должен иметь текст "${text}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator, {
        message: this.getErrorMessage(`не имеет текста "${text}"`)
      }).toHaveText(text)
    })
  }

  public async checkAttribute({ name, value }: ElementAttribute) {
    //Инпут "search input on players list page" должен иметь атрибут data-active="true";
    await test.step(`${this.typeOf} "${this.elementName}" должен иметь атрибут ${name}="${value}"`, async () => {
      const locator: Locator = this.getLocator()
      await expect(locator, {
        message: this.getErrorMessage(`не имеет атрибута ${name}="${value}"`)
      }).toHaveAttribute(name, value)
    })
  }

  public async click() {
    //Клик по Инпуту с названием "search input";
    await test.step(`Клик по ${this.typeOf} с названием "${this.elementName}"`, async () => {
      const locator: Locator = this.getLocator()
      await locator.click()
    })
  }
}

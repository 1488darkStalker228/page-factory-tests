import { expect, Locator, Page, test } from '@playwright/test'
import {
  BaseElementProps,
  ElementAttribute,
  SelectorProps
} from '../../types/page-factory/base-element'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import selectorStringHandler from '../selector-string-handler'

export default abstract class BaseElement {
  //Просто обязательно описываем поля, которые у нас будут;
  readonly page: Page
  readonly selector: string
  private readonly name: string | undefined
  readonly searchIn: Locator | undefined
  readonly locator: Locator
  /*
    В данный конструктор действительно закидывается объект с определённым нами типом;
    Таким образом, мы получаем доступ к нужным нам ключам объекта без точки "." и сразу видим, что в этом объекте лежит;
  */
  constructor({ page, selector, name, searchIn }: BaseElementProps) {
    this.page = page
    this.selector = selector
    this.name = name
    this.searchIn = searchIn
    this.locator = this.getLocator()
  }

  public getLocator(selectorProps: SelectorProps = {}): Locator {
    //Кладём в константу locator значение ключа locator (если он есть), а все остальные свойства кладём в создаваемый объект context;
    const { selector, ...context } = selectorProps
    if (this.searchIn) {
      return this.searchIn.locator(selectorStringHandler(selector || this.selector, context))
    } else {
      return this.page.locator(selectorStringHandler(selector || this.selector, context))
    }
  }

  //Для отчёта;
  public get typeOf(): string {
    return 'component'
  }

  public get typeOfUpper(): string {
    return capitalizeFirstLetter(this.typeOf)
  }

  public get componentName(): string {
    //Оператор подавления;
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"')
    }
    return this.name
  }

  private getErrorMessage(action: string): string {
    return `The ${this.typeOf} with name "${this.componentName}" and locator ${this.selector} ${action}`
  }

  public async checkVisible(selectorProps: SelectorProps = {}) {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
      const locator: Locator = this.getLocator(selectorProps)
      await expect(locator, {
        message: this.getErrorMessage('is not visible')
      }).toBeVisible()
    })
  }

  public async checkContainText(text: string, selectorProps: SelectorProps = {}) {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should contain text "${text}"`, async () => {
      const locator: Locator = this.getLocator(selectorProps)
      await expect(locator, {
        message: this.getErrorMessage(`does not have text "${text}"`)
      }).toContainText(text)
    })
  }

  public async checkHaveText(text: string, selectorProps: SelectorProps = {}) {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should have text "${text}"`, async () => {
      const locator: Locator = this.getLocator(selectorProps)
      await expect(locator, {
        message: this.getErrorMessage(`does not have text "${text}"`)
      }).toHaveText(text)
    })
  }

  public async click(selectorProps: SelectorProps = {}) {
    await test.step(`Clicking the ${this.typeOf} with name "${this.componentName}"`, async () => {
      const locator: Locator = this.getLocator(selectorProps)
      await locator.click()
    })
  }

  //Нужно разобраться с этими блядскими параметрами; Я нихера не пойму, зачем нужны селектор-прапсы?
  //Какая-то зацыпка была. Мессага тоже должна быть кастомная;
  public async checkAttribute(attribute: ElementAttribute, selectorProps: SelectorProps = {}) {
    const { name, value } = attribute
    await test.step(`${this.typeOfUpper} '${this.componentName}' should have attribute '${name}=${value}'`, async () => {
      const locator: Locator = this.getLocator(selectorProps)
      await expect(locator).toHaveAttribute(name, value)
    })
  }
}

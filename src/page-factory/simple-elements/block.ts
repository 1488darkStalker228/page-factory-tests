import BaseElement from './base-element'
import test from '@playwright/test'

export default class Block extends BaseElement {
  public get typeOf(): string {
    return 'Блок'
  }

  public async getInnerText() {
    return await this.getLocator().innerText()
  }
}

import BaseElement from './base-element'
import test from '@playwright/test'

export default class Block extends BaseElement {
  get typeOf(): string {
    return 'block'
  }

  public async getInnerText() {
    return await this.getLocator().innerText()
  }
}

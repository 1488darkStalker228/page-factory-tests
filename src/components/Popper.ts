import Block from '../page-factory/elements/block'
import { Page } from '@playwright/test'

export default class Popper {
  readonly list: Block
  readonly item: Block

  constructor(readonly page: Page) {
    this.list = new Block({ page, selector: '[id^="popper"]', name: 'popper' })
    this.item = new Block({
      page,
      selector: '[id^="popper"] [class$="address__item"]',
      name: 'popper'
    })
  }

  public async test() {}
}

import Block from '../page-factory/elements/block'
import { expect, Page } from '@playwright/test'

export default class ItemsCounter {
  readonly counter: Block

  constructor(readonly page: Page) {
    this.counter = new Block({
      page,
      selector: '[class="ui-pagination__item"] >> nth=0',
      name: 'items counter'
    })
  }

  public async waitLoadingPageElements(counterFromServer: number) {
    await expect(async () => {
      expect(
        Number(
          (await this.counter.getInnerText()).slice(
            (await this.counter.getInnerText()).indexOf('из') + 3
          )
        ),
        'Некое кастомное сообщение'
      ).toEqual(counterFromServer)
    }).toPass()
  }
}

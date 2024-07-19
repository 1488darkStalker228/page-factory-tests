import test, { expect, Page } from '@playwright/test'
import Block from '../../page-factory/simple-elements/block'

export default class ItemsCounter {
  public readonly itemsCounter: Block

  constructor(page: Page) {
    this.itemsCounter = new Block({
      page,
      selector: '[class="ui-pagination__item"] >> nth=0',
      name: 'items counter'
    })
  }

  public async waitLoadingPageElements(counterFromServer: number) {
    await test.step('Ожидание загрузки элементов на странице', async () => {
      await expect(
        async () => {
          expect(
            Number(
              (await this.itemsCounter.getInnerText()).slice(
                (await this.itemsCounter.getInnerText()).indexOf('из') + 3
              )
            )
          ).toEqual(counterFromServer)
        },
        { message: 'Элементы не были загружены' }
      ).toPass({ timeout: 10000 })
    })
  }
}

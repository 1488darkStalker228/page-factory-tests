import { Page } from '@playwright/test'
import Link from '../page-factory/simple-elements/link'
import Block from '../page-factory/simple-elements/block'

export default class TableItem {
  public readonly itemBlock: Block
  public readonly gotoEntityLink: Link

  public constructor(readonly page: Page) {
    this.itemBlock = new Block({
      page,
      selector: 'main[class^="ui-table-items-row"] >> nth=0',
      name: 'item block'
    })

    this.gotoEntityLink = new Link({
      page,
      selector: 'a',
      name: 'goto entity link',
      searchIn: this.itemBlock.getLocator()
    })
  }

  public async gotoEntity(responseUrl: string) {
    await Promise.all([
      this.page.waitForResponse(new RegExp(responseUrl)),
      this.gotoEntityLink.click()
    ])
  }

  public async click() {
    await this.itemBlock.click()
    await this.itemBlock.checkAttribute({ name: 'data-selected', value: 'true' })
  }

  public async getItemText(): Promise<Array<string>> {
    return (await this.itemBlock.getInnerText()).split('\n')
  }
}

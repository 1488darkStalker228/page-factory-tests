import { Page } from '@playwright/test'
import Link from '../page-factory/elements/link'

export default class ItemLink {
  readonly link: Link

  constructor(readonly page: Page) {
    this.link = new Link({
      page,
      selector: '[class="ui-table-items-row__field"] >> nth=0 >> a',
      name: 'item link'
    })
  }

  public async gotoEntity(responseUrl: string, expectedUrl: string) {
    await Promise.all([this.page.waitForResponse(new RegExp(responseUrl)), this.link.click()])
    await this.link.checkUrl(expectedUrl)
  }
}

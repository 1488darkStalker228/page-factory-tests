import { Page } from '@playwright/test'
import Block from '../page-factory/elements/block'
import Input from '../page-factory/elements/input'

export default class MultiplePopperDropdown {
  readonly dropdownBlock: Block
  readonly list: Block
  readonly searchInput: Input

  constructor(readonly page: Page) {
    this.dropdownBlock = new Block({
      page,
      selector: '[class="ui-dropdown-multiple"]',
      name: 'dropdown block'
    })
    this.list = new Block({
      page,
      selector: '[class="ui-dropdown-multiple__popper"]',
      name: 'list'
    })
    this.searchInput = new Input({
      page,
      selector: '[placeholder="Поиск..."]',
      name: 'search input',
      searchIn: this.list.locator
    })
  }

  public async selectItemsFromMultipleDropdown() {
    await this.dropdownBlock.click()
    await this.list.checkVisible()
    await this.searchInput.fill('autotests')
  }
}

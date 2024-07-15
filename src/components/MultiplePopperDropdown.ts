import { Page } from '@playwright/test'
import Block from '../page-factory/simple-elements/block'
import Input from '../page-factory/simple-elements/input'
import CustomCheckbox from '../page-factory/extended-elements/custom-checkbox'

export default class MultiplePopperDropdown {
  public readonly dropdownBlock: Block
  public readonly list: Block
  public readonly searchInput: Input

  public constructor(readonly page: Page) {
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
      searchIn: this.list.getLocator()
    })
  }

  public async selectItemsFromMultipleDropdown() {
    await this.dropdownBlock.click()
    await this.list.checkVisible()
    await Promise.all([this.page.waitForResponse(/paged/), this.searchInput.fill('autotests')])

    for (let i = 0; i < 2; i++) {
      const customCheckbox: CustomCheckbox = new CustomCheckbox({ page: this.page, position: i })
      await customCheckbox.click()

      const listItem: Block = new Block({
        page: this.page,
        selector: `[class="ui-checkbox__slot"] >> nth=${i}`,
        name: 'list item'
      })

      const listItemText: string = await listItem.getInnerText()

      const dropdownItem: Block = new Block({
        page: this.page,
        selector: `[class="ui-dropdown-multiple__popper-item"] >> nth=${i}`,
        name: 'dropdown item'
      })

      await dropdownItem.checkHaveText(listItemText)
    }

    const label: Block = new Block({
      page: this.page,
      selector: '[class="ui-text ui-group__label-text" ] >> nth=0',
      name: 'name label'
    })
    await label.click()
  }
}

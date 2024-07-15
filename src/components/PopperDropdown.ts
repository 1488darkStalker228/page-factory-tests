import Block from '../page-factory/simple-elements/block'
import Input from '../page-factory/simple-elements/input'
import { BaseElementProps } from '../types/page-factory/base-element'

export default class PopperDropdown {
  public readonly dropdownInput: Input
  public readonly list: Block
  public readonly addressItem: Block
  public readonly item: Block

  public constructor({ page, selector, name, searchIn }: BaseElementProps) {
    this.dropdownInput = new Input({ page, selector, name, searchIn })
    this.list = new Block({ page, selector: '[id^="popper"]', name: 'popper list' })
    this.addressItem = new Block({
      page,
      selector: '[class$="address__item"] >> nth=0',
      name: 'address list item',
      searchIn: this.list.getLocator()
    })
    this.item = new Block({
      page,
      selector: '[class$="single__item"] >> nth=0',
      name: 'list item',
      searchIn: this.list.getLocator()
    })
  }

  public async fillAddress(address: string) {
    await this.dropdownInput.fill(address)
    await this.list.checkVisible()
    await this.addressItem.checkContainText(address)
    const fullAddress: string = await this.addressItem.getInnerText()
    await this.addressItem.click()
    await this.dropdownInput.checkValue(fullAddress)
    await this.list.getLocator().waitFor({ state: 'detached' })
  }

  public async selectItemFromDropdown(searchQuery: string) {
    await this.dropdownInput.click()
    await this.list.checkVisible()
    await this.dropdownInput.fill(searchQuery)
    await this.item.checkHaveText(searchQuery)
    await this.item.click()
    await this.dropdownInput.checkValue(searchQuery)
    await this.list.getLocator().waitFor({ state: 'detached' })
  }
}

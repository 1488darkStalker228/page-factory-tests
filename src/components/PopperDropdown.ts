import Block from '../page-factory/elements/block'
import Input from '../page-factory/elements/input'
import { BaseElementProps } from '../types/page-factory/base-element'

export default class PopperDropdown {
  readonly dropdownInput: Input
  readonly list: Block
  readonly addressItem: Block
  readonly item: Block

  constructor({ page, selector, name, searchIn }: BaseElementProps) {
    this.dropdownInput = new Input({ page, selector, name, searchIn })
    this.list = new Block({ page, selector: '[id^="popper"]', name: 'list' })
    this.addressItem = new Block({
      page,
      selector: '[class$="address__item"] >> nth=0',
      name: 'popper',
      searchIn: this.list.locator
    })
    this.item = new Block({
      page,
      selector: '[class$="single__item"] >> nth=0',
      name: 'popper',
      searchIn: this.list.locator
    })
  }

  public async fillAddress() {
    const address: string = 'Ростов-на-Дону'
    await this.dropdownInput.fill(address)
    await this.list.checkVisible()
    await this.addressItem.checkContainText(address)
    const fullAddress: string = await this.addressItem.getInnerText()
    await this.addressItem.click()
    await this.dropdownInput.checkValue(fullAddress)
    await this.list.locator.waitFor({ state: 'detached' })
  }

  //Не ждёт правильного заполнения инпута;
  public async selectItemFromDropdown(searchQuery: string) {
    await this.dropdownInput.click()
    await this.list.checkVisible()
    await this.dropdownInput.fill(searchQuery)
    await this.item.checkHaveText(searchQuery)
    await this.item.click()
    await this.dropdownInput.checkValue(searchQuery)
    await this.list.locator.waitFor({ state: 'detached' })
  }
}

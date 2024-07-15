import { Page } from '@playwright/test'
import Input from '../../page-factory/simple-elements/input'
import CustomCheckbox from '../../page-factory/extended-elements/custom-checkbox'
import Button from '../../page-factory/simple-elements/button'
import Block from '../../page-factory/simple-elements/block'

export default class ModalTreeItems {
  public readonly modal: Block
  public readonly searchInput: Input
  public readonly criteriaCheckbox: CustomCheckbox
  public readonly confirmBtn: Button

  public constructor(page: Page) {
    this.modal = new Block({ page, selector: '[role="dialog"]', name: 'modal tree items' })
    this.searchInput = new Input({
      page,
      selector: '[class="ui-input__element"]',
      name: 'search input in modal tree items',
      searchIn: this.modal.getLocator()
    })
    this.criteriaCheckbox = new CustomCheckbox({ page, position: 1 })
    this.confirmBtn = new Button({
      page,
      selector: '[class="ui-button"] >> nth=0',
      name: 'confirm button',
      searchIn: this.modal.getLocator()
    })
  }

  public async checkVisibleModal() {
    await this.modal.checkVisible()
  }

  public async selectCriteria() {
    await this.searchInput.fill('criteria__autotests')
    await this.criteriaCheckbox.click()
    await this.confirmBtn.click()
  }
}

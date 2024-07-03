import { Page } from '@playwright/test'
import Block from '../page-factory/elements/block'
import BaseModal from './Modals/BaseModal'

export default class CreateEntityBlock {
  readonly block: Block
  private readonly baseModal: BaseModal

  constructor(
    readonly page: Page,
    entityName: string
  ) {
    this.block = new Block({
      page,
      selector: '[class="ui-controls__item"] >> nth=0',
      name: `create ${entityName} block`
    })
    this.baseModal = new BaseModal(page)
  }

  public async click() {
    await this.block.click()
    await this.baseModal.checkVisibleModal()
  }
}

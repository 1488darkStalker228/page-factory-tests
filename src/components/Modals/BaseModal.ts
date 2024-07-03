import { Page } from '@playwright/test'
import Block from '../../page-factory/elements/block'

export default class BaseModal {
  readonly modal: Block

  constructor(readonly page: Page) {
    this.modal = new Block({ page, selector: '[class="main__modals"]', name: 'modal' })
  }

  public async checkVisibleModal() {
    await this.modal.checkVisible()
    await this.modal.checkAttribute({ name: 'data-active', value: 'true' })
  }
}

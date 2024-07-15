import { Page } from '@playwright/test'
import Block from '../../page-factory/simple-elements/block'
import Button from '../../page-factory/simple-elements/button'

export default class ModalBase {
  public readonly modal: Block
  public readonly confirmBtn: Button

  public constructor(readonly page: Page) {
    this.modal = new Block({ page, selector: '[class="main__modals"]', name: 'modal' })
    this.confirmBtn = new Button({
      page,
      selector: '[class="ui-button"] >> nth=0',
      name: 'confirm button',
      searchIn: this.modal.getLocator()
    })
  }

  public async checkVisibleModal() {
    await this.modal.checkVisible()
    await this.modal.checkAttribute({ name: 'data-active', value: 'true' })
  }

  public async clickOnConfirmBtn(url: string) {
    //Здесь надо проверять, что запрос возвращает 200;
    await Promise.all([this.page.waitForResponse(new RegExp(url)), this.confirmBtn.click()])
  }
}

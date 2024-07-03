import Input from '../../page-factory/elements/input'
import { Page } from '@playwright/test'
import BaseModal from './BaseModal'
import Popper from '../Popper'

export default class ModalCreateNewPlayer extends BaseModal {
  readonly nameInput: Input
  readonly addressInput: Input
  readonly storeNumberInput: Input
  readonly divisionCodeInput: Input

  readonly popper: Popper

  constructor(readonly page: Page) {
    super(page)
    this.nameInput = new Input({
      page,
      selector: `[class="main__modals"] [class="ui-input__element"] >> nth=0`,
      name: 'name input'
    })
    this.addressInput = new Input({
      page,
      selector: `[class="main__modals"] [class="ui-input__element"] >> nth=1`,
      name: 'address input'
    })
    this.storeNumberInput = new Input({
      page,
      selector: `[class="main__modals"] [class="ui-input__element"] >> nth=2`,
      name: 'store number input'
    })
    this.divisionCodeInput = new Input({
      page,
      selector: `[class="main__modals"] [class="ui-input__element"] >> nth=3`,
      name: 'division code input'
    })

    this.popper = new Popper(page)
  }

  public async fillAddress() {
    await this.addressInput.fill('Ростов-на-Дону')
    await this.popper.list.checkVisible()
  }
}

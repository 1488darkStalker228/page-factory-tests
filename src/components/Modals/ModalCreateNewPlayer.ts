import Input from '../../page-factory/elements/input'
import { Page } from '@playwright/test'
import BaseModal from './BaseModal'
import PopperDropdown from '../PopperDropdown'
import MultiplePopperDropdown from '../MultiplePopperDropdown'

export default class ModalCreateNewPlayer extends BaseModal {
  readonly nameInput: Input
  readonly addressDropdown: PopperDropdown
  readonly storeNumberInput: Input
  readonly divisionCodeInput: Input
  readonly workModeDropdown: PopperDropdown
  readonly settingsProfileDropdown: PopperDropdown
  readonly scheduleDropdown: PopperDropdown
  readonly mediaPlansDropdown: MultiplePopperDropdown

  constructor(readonly page: Page) {
    super(page)
    this.nameInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=0',
      name: 'name input',
      searchIn: this.modal.locator
    })
    this.addressDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=1',
      name: 'address dropdown input',
      searchIn: this.modal.locator
    })
    this.storeNumberInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=2',
      name: 'store number input',
      searchIn: this.modal.locator
    })
    this.divisionCodeInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=3',
      name: 'division code input',
      searchIn: this.modal.locator
    })
    this.workModeDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=4',
      name: 'work mode dropdown input',
      searchIn: this.modal.locator
    })
    this.settingsProfileDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=5',
      name: 'settings profile dropdown input',
      searchIn: this.modal.locator
    })
    this.scheduleDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=6',
      name: 'schedule dropdown input',
      searchIn: this.modal.locator
    })
    this.mediaPlansDropdown = new MultiplePopperDropdown(page)
  }
}

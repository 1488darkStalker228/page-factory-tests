import Input from '../../page-factory/simple-elements/input'
import { Page } from '@playwright/test'
import ModalBase from './ModalBase'
import PopperDropdown from '../PopperDropdown'
import MultiplePopperDropdown from '../MultiplePopperDropdown'
import ModalTreeItems from './ModalTreeItems'

export default class ModalCreateNewPlayer extends ModalBase {
  public readonly nameInput: Input
  public readonly addressDropdown: PopperDropdown
  public readonly storeNumberInput: Input
  public readonly divisionCodeInput: Input
  public readonly workModeDropdown: PopperDropdown
  public readonly settingsProfileDropdown: PopperDropdown
  public readonly scheduleDropdown: PopperDropdown
  public readonly mediaPlansDropdown: MultiplePopperDropdown
  public readonly criteriaInput: Input
  public readonly modalTreeItems: ModalTreeItems

  public constructor(page: Page) {
    super(page)
    this.nameInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=0',
      name: 'name input',
      searchIn: this.modal.getLocator()
    })
    this.addressDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=1',
      name: 'address dropdown input',
      searchIn: this.modal.getLocator()
    })
    this.storeNumberInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=2',
      name: 'store number input',
      searchIn: this.modal.getLocator()
    })
    this.divisionCodeInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=3',
      name: 'division code input',
      searchIn: this.modal.getLocator()
    })
    this.workModeDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=4',
      name: 'work mode dropdown input',
      searchIn: this.modal.getLocator()
    })
    this.settingsProfileDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=5',
      name: 'settings profile dropdown input',
      searchIn: this.modal.getLocator()
    })
    this.scheduleDropdown = new PopperDropdown({
      page,
      selector: '[class="ui-input__element"] >> nth=6',
      name: 'schedule dropdown input',
      searchIn: this.modal.getLocator()
    })
    this.mediaPlansDropdown = new MultiplePopperDropdown(page)
    this.criteriaInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=7',
      name: 'criteria input',
      searchIn: this.modal.getLocator()
    })
    this.modalTreeItems = new ModalTreeItems(page)
  }

  public async clickOnCriteriaInput() {
    await this.criteriaInput.click()
    await this.modalTreeItems.checkVisibleModal()
  }
}

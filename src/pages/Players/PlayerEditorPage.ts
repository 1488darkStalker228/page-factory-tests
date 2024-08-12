import BasePage from '../Base/BasePage'
import { expect, Page } from '@playwright/test'
import Input from '../../page-factory/simple-elements/input'
import { PlayerData } from '../../tests/players.spec'
import Link from '../../page-factory/simple-elements/link'
import Block from '../../page-factory/simple-elements/block'

export default class PlayerEditorPage extends BasePage {
  public readonly playerTitle: Block
  public readonly authorizationKeyInput: Input
  private _authorizationKey: string
  public readonly addressInput: Input
  public readonly storeNumberInput: Input
  public readonly divisionCodeInput: Input
  public readonly workModeInput: Input
  public readonly settingsTab: Link
  public readonly settingsProfileAlert: Block
  public readonly scheduleTab: Link
  public readonly scheduleAlert: Block
  public readonly scheduleLink: Link
  public readonly advertsTab: Link
  public readonly advertsAlert: Block
  public readonly breadCrumbsLast: Block

  public constructor(page: Page) {
    super(page)
    this.authorizationKeyInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=0',
      name: 'authorization key input'
    })
    this._authorizationKey = ''
    this.playerTitle = new Block({
      page,
      selector: '[class="ui-title__contenteditable"]',
      name: 'player title'
    })
    this.addressInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=1',
      name: 'address input'
    })
    this.storeNumberInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=2',
      name: 'store number input'
    })
    this.divisionCodeInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=3',
      name: 'division code input'
    })
    this.workModeInput = new Input({
      page,
      selector: '[class="ui-input__element"] >> nth=4',
      name: 'work mode input'
    })
    this.settingsTab = new Link({ page, selector: '[href$="/settings"]', name: 'settings tab' })
    this.settingsProfileAlert = new Block({
      page,
      selector: '[class^="ui-alert"] >> nth=0',
      name: 'settings profile alert'
    })
    this.scheduleTab = new Link({
      page,
      selector: '[href$="/schedules"] >> nth=1',
      name: 'schedule tab'
    })
    this.scheduleAlert = new Block({
      page,
      selector: '[class^="ui-alert"] >> nth=0',
      name: 'schedule alert'
    })
    this.scheduleLink = new Link({
      page,
      selector: '[href^="/schedules"] >> nth=1',
      name: 'schedule link'
    })
    this.advertsTab = new Link({
      page,
      selector: '[href$="/adverts/"] >> nth=0',
      name: 'adverts tab'
    })
    this.advertsAlert = new Block({
      page,
      selector: '[class="ui-alert"]',
      name: 'adverts alert'
    })
    this.breadCrumbsLast = new Block({
      page,
      selector: '[class="ui-breadcrumbs__item"]:last-child',
      name: 'bread crumbs last'
    })
  }

  public get authorizationKey(): string {
    return this._authorizationKey
  }

  public async setAuthorizationKey() {
    await expect(async () => {
      this._authorizationKey = await this.authorizationKeyInput.getValue()
      expect(this._authorizationKey).not.toEqual('')
    }).toPass()
  }

  public async checkTabsData({
    name,
    address,
    storeNumber,
    divisionCode,
    workMode,
    settingsProfile,
    schedule
  }: PlayerData) {
    await this.playerTitle.checkHaveText(name)
    await this.addressInput.checkValue(address)
    await this.storeNumberInput.checkValue(storeNumber)
    await this.divisionCodeInput.checkValue(divisionCode)
    await this.workModeInput.checkValue(workMode)

    await this.settingsTab.click()
    await this.settingsTab.checkAttribute({ name: 'data-active', value: 'true' })
    await this.settingsProfileAlert.checkVisible()
    await this.settingsProfileAlert.checkContainText(settingsProfile)

    await this.scheduleTab.click()
    await this.scheduleTab.checkAttribute({ name: 'data-active', value: 'true' })
    await this.scheduleAlert.checkHide()
    await this.scheduleLink.checkHaveText(schedule)

    await this.advertsTab.click()
    await this.advertsTab.checkAttribute({ name: 'data-active', value: 'true' })
    await this.advertsAlert.checkHide()
  }

  public async clickOnLastBreadCrumb() {
    await Promise.all([this.page.waitForResponse(/paged/), this.breadCrumbsLast.click()])
    await this.checkUrl('Folder')
  }
}

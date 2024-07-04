import { Page } from '@playwright/test'
import Icon from '../../page-factory/elements/icon'
import Block from '../../page-factory/elements/block'
import Link from '../../page-factory/elements/link'

export default class AppSidebar {
  private readonly expandPlayersIcon: Icon
  private readonly playersList: Block
  private readonly playersLink: Link

  constructor(readonly page: Page) {
    this.expandPlayersIcon = new Icon({
      page,
      selector: '[class="app-sidebar__item-chevron"] >> nth=3 >> svg',
      name: 'expand players section icon'
    })
    this.playersList = new Block({
      page,
      selector: '[class="app-sidebar__item-children"] >> nth=1',
      name: 'players section list'
    })
    this.playersLink = new Link({
      page,
      selector: '[href="/players"]',
      name: 'players list page link',
      searchIn: this.playersList.locator
    })
  }

  public async gotoPlayersPageIsDropdown() {
    await this.expandPlayersIcon.click()
    await this.expandPlayersIcon.checkAttribute({
      name: 'data-active',
      value: 'true'
    })
    await this.playersList.checkVisible()
    await this.playersLink.click()
    await this.playersLink.checkAttribute({
      name: 'data-active',
      value: 'true'
    })
  }
}

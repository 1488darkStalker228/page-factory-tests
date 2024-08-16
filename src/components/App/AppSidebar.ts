import { Page } from '@playwright/test'
import Icon from '@page-factory/simple-elements/icon'
import Block from '@page-factory/simple-elements/block'
import Link from '@page-factory/simple-elements/link'

export default class AppSidebar {
  public readonly tracksLinkItem: Link
  public readonly expandPlayersIcon: Icon
  public readonly playersList: Block
  public readonly playersLink: Link

  public constructor(readonly page: Page) {
    this.tracksLinkItem = new Block({
      page,
      selector: '[class="app-sidebar__item"] >> nth=1',
      name: 'tracks item'
    })
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
      searchIn: this.playersList.getLocator()
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

  public async gotoPage() {
    await this.tracksLinkItem.click()
    await this.tracksLinkItem.checkAttribute({ name: 'data-active', value: 'true' })
  }
}

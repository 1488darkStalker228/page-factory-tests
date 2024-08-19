import { Page } from '@playwright/test'
import Icon from '@page-factory/simple-elements/icon'
import Block from '@page-factory/simple-elements/block'
import Link from '@page-factory/simple-elements/link'

export default class AppSidebar {
  public readonly expandPlayersIcon: Icon
  public readonly playersList: Block
  public readonly playersLink: Link
  public readonly expandPlaylistsIcon: Icon
  public readonly playlistsList: Block
  public readonly downloadPlaylistsLink: Link

  public constructor(readonly page: Page) {
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
    this.expandPlaylistsIcon = new Icon({
      page,
      selector: '[class="app-sidebar__item-chevron"] >> nth=5 >> svg',
      name: 'expand playlists section icon'
    })
    this.playlistsList = new Block({
      page,
      selector: '[class="app-sidebar__item-children"] >> nth=3',
      name: 'playlists section list'
    })
    this.downloadPlaylistsLink = new Link({
      page,
      selector: '[href="/playlists/download"]',
      name: 'download playlists list page link'
    })
  }

  public async gotoPageIsDropdown(icon: Icon, list: Block, link: Link) {
    await icon.click()
    await icon.checkAttribute({
      name: 'data-active',
      value: 'true'
    })
    await list.checkVisible()
    await link.click()
    await link.checkAttribute({
      name: 'data-active',
      value: 'true'
    })
  }

  // public async gotoPage() {
  //   await this.tracksLinkItem.click()
  //   await this.tracksLinkItem.checkAttribute({ name: 'data-active', value: 'true' })
  // }
}

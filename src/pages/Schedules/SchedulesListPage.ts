import { Page } from '@playwright/test'
import BasePage from '../Base/BasePage'

export default class SchedulesListPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  public async testMethod() {
    await this.appSidebar.gotoPageIsDropdown(
      this.appSidebar.expandPlaylistsIcon,
      this.appSidebar.playlistsList,
      this.appSidebar.downloadPlaylistsLink
    )
  }
}

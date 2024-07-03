import { APIRequestContext, Page } from '@playwright/test'
import AppSidebar from '../components/App/AppSidebar'
import SearchInput from '../components/SearchInput'
import ItemLink from '../components/ItemLink'
import PlayersRequests from '../requests/players-requests'
import ItemsCounter from '../components/ItemsCounter'

export default class PlayersActor {
  private readonly appSidebar: AppSidebar
  private readonly searchInput: SearchInput
  private readonly itemLink: ItemLink
  private readonly playersRequests: PlayersRequests
  private readonly itemsCounter: ItemsCounter

  constructor(
    readonly contextPage: Page,
    request: APIRequestContext
  ) {
    this.appSidebar = new AppSidebar(contextPage)
    this.searchInput = new SearchInput(contextPage)
    this.itemLink = new ItemLink(contextPage)
    this.playersRequests = new PlayersRequests(contextPage, request)
    this.itemsCounter = new ItemsCounter(contextPage)
  }

  public async gotoPageAndFolder(searchQuery: string) {
    await this.appSidebar.gotoPlayersPageIsDropdown()
    await this.itemsCounter.waitLoadingPageElements(await this.playersRequests.paged())
    await this.searchInput.input.fill('root-folder__autotests')
    await this.itemsCounter.waitLoadingPageElements(
      await this.playersRequests.paged('root-folder__autotests')
    )
    await this.itemLink.gotoEntity('paged', 'Folder')
    await this.searchInput.input.fill(searchQuery)
    await this.itemsCounter.waitLoadingPageElements(await this.playersRequests.paged(searchQuery))
    await this.itemLink.gotoEntity('paged', 'Folder')
  }
}

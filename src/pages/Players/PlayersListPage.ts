import { APIRequestContext, expect, Page } from '@playwright/test'
import { PlayerData } from '../../tests/players.spec'
import ModalCreateNewPlayer from '../../components/Modals/ModalCreateNewPlayer'
import ListPage from '../Base/ListPage'
import Input from '../../page-factory/simple-elements/input'
import PlayersRequests from '../../requests/players-requests'
import ActionIcon from '../../page-factory/extended-elements/action-icon'

export default class PlayersListPage extends ListPage {
  public readonly searchInput: Input
  public readonly createPlayerIcon: ActionIcon
  public readonly deletePlayerOrFolderIcon: ActionIcon
  public readonly modalCreateNewPlayer: ModalCreateNewPlayer
  private readonly playersRequests: PlayersRequests

  public constructor(page: Page, request: APIRequestContext) {
    super(page)
    this.createPlayerIcon = new ActionIcon({
      page,
      selector: '[class="ui-controls__item"] >> nth=0',
      name: 'create player icon'
    })
    this.deletePlayerOrFolderIcon = new ActionIcon({
      page,
      selector: '[class^="ui-controls__item"] >> nth=3',
      name: 'delete player or folder icon'
    })
    this.searchInput = new Input({
      page,
      selector: '[class="ui-input__element"]',
      name: 'search input on players list page'
    })
    this.modalCreateNewPlayer = new ModalCreateNewPlayer(page)
    this.playersRequests = new PlayersRequests(page, request)
  }

  public async gotoPageAndFolder(searchQuery: string) {
    await this.appSidebar.gotoPlayersPageIsDropdown()
    await this.waitLoadingPageElements(await this.playersRequests.paged())
    await this.searchInput.fill('root-folder__autotests')
    await this.waitLoadingPageElements(await this.playersRequests.paged('root-folder__autotests'))
    await this.tableItem.gotoEntity('paged')
    await this.checkUrl('Folder')
    await this.searchInput.fill(searchQuery)
    await this.waitLoadingPageElements(await this.playersRequests.paged(searchQuery))
    await this.tableItem.gotoEntity('paged')
    await this.checkUrl('Folder')
  }

  public async checkItemData({ name, storeNumber, divisionCode, authorizationKey }: PlayerData) {
    const itemText: Array<string> = await this.tableItem.getItemText()
    expect(name).toEqual(itemText[0])
    expect(storeNumber).toEqual(itemText[1])
    expect(divisionCode).toEqual(itemText[2])
    expect(authorizationKey).toEqual(itemText[3])
  }
}

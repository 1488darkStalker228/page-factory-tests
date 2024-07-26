import { APIRequestContext, expect, Locator, Page } from '@playwright/test'
import { PlayerData } from '../../tests/players.spec'
import ModalCreateNewPlayer from '../../components/Modals/ModalCreateNewPlayer'
import Input from '../../page-factory/simple-elements/input'
import PlayersRequests from '../../requests/players-requests'
import ActionIcon from '../../page-factory/extended-elements/action-icon'
import PlayerTableItem from '../../components/Table/PlayerTableItem'
import BasePage from '../Base/BasePage'
import ItemsCounter from '../../components/Table/ItemsCounter'
import ModalConfirm from '../../components/Modals/ModalConfirm'

export default class PlayersListPage extends BasePage {
  public readonly searchInput: Input
  public readonly createPlayerIcon: ActionIcon
  private readonly itemsCounter: ItemsCounter
  public readonly deletePlayerOrFolderIcon: ActionIcon
  public readonly modalCreateNewPlayer: ModalCreateNewPlayer
  private readonly playerTableItem: PlayerTableItem
  public readonly modalConfirm: ModalConfirm
  private readonly playersRequests: PlayersRequests

  public constructor(page: Page, request: APIRequestContext) {
    super(page)
    this.searchInput = new Input({
      page,
      selector: '[class="ui-input__element"]',
      name: 'search input on players list page'
    })
    this.createPlayerIcon = new ActionIcon({
      page,
      selector: '[class="ui-controls__item"] >> nth=0',
      name: 'create player icon'
    })
    this.itemsCounter = new ItemsCounter(page)
    this.deletePlayerOrFolderIcon = new ActionIcon({
      page,
      selector: '[class^="ui-controls__item"] >> nth=3',
      name: 'delete player or folder icon'
    })
    this.modalCreateNewPlayer = new ModalCreateNewPlayer(page)
    this.playerTableItem = new PlayerTableItem(page)
    this.modalConfirm = new ModalConfirm(page)
    this.playersRequests = new PlayersRequests(page, request)
  }

  public async gotoPageAndFolder(searchQuery: string) {
    await this.appSidebar.gotoPlayersPageIsDropdown()
    await this.itemsCounter.waitLoadingPageElements(await this.playersRequests.paged())
    await this.searchInput.fill('root-folder__autotests')
    await this.itemsCounter.waitLoadingPageElements(
      await this.playersRequests.paged('root-folder__autotests')
    )
    await this.playerTableItem.gotoEntity('paged')
    await this.checkUrl('Folder')
    await this.searchInput.fill(searchQuery)
    await this.itemsCounter.waitLoadingPageElements(await this.playersRequests.paged(searchQuery))
    await this.playerTableItem.gotoEntity('paged')
    await this.checkUrl('Folder')
  }

  public async checkItemData({ name, storeNumber, divisionCode, authorizationKey }: PlayerData) {
    await this.playerTableItem.nameBlock.checkHaveText(name)
    await this.playerTableItem.storeNumberBlock.checkHaveText(storeNumber)
    await this.playerTableItem.divisionCodeBlock.checkHaveText(divisionCode)
    await this.playerTableItem.authorizationKeyBlock.checkHaveText(authorizationKey)
  }

  public async deleteItem(deleteIcon: Locator) {
    await this.playerTableItem.click()
    await deleteIcon.click()
    await this.modalConfirm.clickOnConfirmBtn('remove')
  }
}

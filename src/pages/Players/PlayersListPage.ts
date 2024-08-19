import { Locator, Page } from '@playwright/test'
import { PlayerData } from '@tests/players.spec'
import ModalCreateNewPlayer from '@components/Modals/ModalCreateNewPlayer'
import Input from '@page-factory/simple-elements/input'
import ActionIcon from '@page-factory/extended-elements/action-icon'
import PlayerTableItem from '@components/Table/PlayerTableItem'
import BasePage from '../Base/BasePage'
import ItemsCounter from '@components/Table/ItemsCounter'
import ModalConfirm from '@components/Modals/ModalConfirm'

export default class PlayersListPage extends BasePage {
  public readonly searchInput: Input
  public readonly createPlayerIcon: ActionIcon
  private readonly itemsCounter: ItemsCounter
  public readonly deletePlayerOrFolderIcon: ActionIcon
  public readonly modalCreateNewPlayer: ModalCreateNewPlayer
  private readonly playerTableItem: PlayerTableItem
  public readonly modalConfirm: ModalConfirm

  public constructor(page: Page) {
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
  }

  private async waitLoadingPageElements(func: () => Promise<void>) {
    const [response] = await Promise.all([
      this.page.waitForResponse('https://players2-test.cubicservice.ru/v1/folders/paged'),
      func()
    ])
    await this.itemsCounter.waitLoadingPageElements((await response.json()).itemCount)
  }

  public async gotoPageAndFolder(searchQuery: string) {
    await this.waitLoadingPageElements(() =>
      this.appSidebar.gotoPageIsDropdown(
        this.appSidebar.expandPlayersIcon,
        this.appSidebar.playersList,
        this.appSidebar.playersLink
      )
    )
    await this.waitLoadingPageElements(() => this.searchInput.fill('root-folder__autotests'))
    await this.playerTableItem.gotoEntity('paged')
    await this.checkUrl('Folder')
    await this.waitLoadingPageElements(() => this.searchInput.fill(searchQuery))
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

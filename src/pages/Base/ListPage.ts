import BasePage from './BasePage'
import TableItem from '../../components/TableItem'
import test, { expect, Locator, Page } from '@playwright/test'
import ModalConfirm from '../../components/Modals/ModalConfirm'
import Block from '../../page-factory/simple-elements/block'

export default abstract class ListPage extends BasePage {
  public readonly tableItem: TableItem
  public readonly modalConfirm: ModalConfirm
  public readonly itemsCounter: Block

  public constructor(page: Page) {
    super(page)
    this.tableItem = new TableItem(page)
    this.modalConfirm = new ModalConfirm(page)
    this.itemsCounter = new Block({
      page,
      selector: '[class="ui-pagination__item"] >> nth=0',
      name: 'items counter'
    })
  }

  public async waitLoadingPageElements(counterFromServer: number) {
    await test.step('Ожидание загрузки элементов на странице', async () => {
      await expect(async () => {
        expect(
          Number(
            (await this.itemsCounter.getInnerText()).slice(
              (await this.itemsCounter.getInnerText()).indexOf('из') + 3
            )
          )
        ).toEqual(counterFromServer)
      }).toPass()
    })
  }

  public async deleteItem(deleteIcon: Locator) {
    await this.tableItem.click()
    await deleteIcon.click()
    await this.modalConfirm.clickOnConfirmBtn('remove')
  }
}

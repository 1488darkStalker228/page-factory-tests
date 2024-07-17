import ListPage from '../Base/ListPage'
import { Page } from '@playwright/test'

export default class SchedulesListPage extends ListPage {
  constructor(page: Page) {
    super(page)
  }

  public async gotoPage() {}
}

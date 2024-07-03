import BasePage from '../Base/BasePage'
import { Page } from '@playwright/test'
import CreateEntityBlock from '../../components/CreateEntityBlock'

export default class PlayersListPage extends BasePage {
  readonly createEntityBlock: CreateEntityBlock

  constructor(readonly page: Page) {
    super(page)
    this.createEntityBlock = new CreateEntityBlock(page, 'player')
  }
}

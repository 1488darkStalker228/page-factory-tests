import TableItem from './TableItem'
import { Page } from '@playwright/test'
import Block from '../page-factory/simple-elements/block'

export default class PlayerTableItem extends TableItem {
  public nameBlock: Block
  public storeNumberBlock: Block
  public divisionCodeBlock: Block
  public authorizationKeyBlock: Block

  constructor(page: Page) {
    super(page)
    this.nameBlock = new Block({
      page,
      selector: '[class="ui-text"] >> nth=0',
      name: 'player name block',
      searchIn: this.itemBlock.getLocator()
    })
    this.storeNumberBlock = new Block({
      page,
      selector: '[class="ui-text"] >> nth=1',
      name: 'store number block',
      searchIn: this.itemBlock.getLocator()
    })
    this.divisionCodeBlock = new Block({
      page,
      selector: '[class="ui-text"] >> nth=2',
      name: 'division code block',
      searchIn: this.itemBlock.getLocator()
    })
    this.authorizationKeyBlock = new Block({
      page,
      selector: '[class="ui-text"] >> nth=3',
      name: 'authorization key block',
      searchIn: this.itemBlock.getLocator()
    })
  }
}

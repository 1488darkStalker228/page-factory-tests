import { Page } from '@playwright/test'
import Input from '../page-factory/elements/input'

export default class SearchInput {
  readonly input: Input

  constructor(readonly page: Page) {
    this.input = new Input({
      page,
      selector: '[class="ui-input__element"]',
      name: 'search input'
    })
  }
}

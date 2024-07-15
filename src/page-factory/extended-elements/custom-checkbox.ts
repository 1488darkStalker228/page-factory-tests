import { Page } from '@playwright/test'
import Block from '../simple-elements/block'

type CustomCheckboxProps = {
  page: Page
  position: number
}

export default class CustomCheckbox extends Block {
  public constructor({ page, position }: CustomCheckboxProps) {
    super({
      page,
      selector: `[class="ui-checkbox__square"] >> nth=${position}`,
      name: 'custom checkbox'
    })
  }

  public async click() {
    await super.click()
    await this.checkAttribute({ name: 'data-active', value: 'true' })
  }
}

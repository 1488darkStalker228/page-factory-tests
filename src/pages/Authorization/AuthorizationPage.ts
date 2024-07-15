import { Page } from '@playwright/test'
import Input from '../../page-factory/simple-elements/input'
import BasePage from '../Base/BasePage'
import Button from '../../page-factory/simple-elements/button'

export default class AuthorizationPage extends BasePage {
  public readonly emailInput: Input
  public readonly passwordInput: Input
  public readonly loginBtn: Button

  public constructor(page: Page) {
    super(page)
    this.emailInput = new Input({
      page,
      selector: '[id="username"]',
      name: 'email input'
    })
    this.passwordInput = new Input({
      page,
      selector: '[id="password"]',
      name: 'password input'
    })
    this.loginBtn = new Button({
      page,
      selector: '[name="button"]',
      name: 'login button'
    })
  }

  public async authorization() {
    await this.goto('/')
    await this.emailInput.fill('Kakayanaxuypoct@yandex.ru')
    await this.passwordInput.fill('14881337xX!')
    await this.loginBtn.click()
  }
}

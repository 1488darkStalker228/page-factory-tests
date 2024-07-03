import { Page } from '@playwright/test'
import Input from '../../page-factory/elements/input'
import BasePage from '../Base/BasePage'
import Button from '../../page-factory/elements/button'

export default class AuthorizationPage extends BasePage {
  //Каждый локатор это экземпляр от класса из page-factory;
  private readonly emailInput: Input
  private readonly passwordInput: Input
  private readonly loginBtn: Button

  constructor(readonly page: Page) {
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
    await this.visit('/')
    await this.emailInput.fill('Kakayanaxuypoct@yandex.ru')
    await this.passwordInput.fill('14881337xX!')
    await this.loginBtn.click()
  }
}

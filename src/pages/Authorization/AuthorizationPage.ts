import { Page } from '@playwright/test'
import Input from '../../page-factory/simple-elements/input'
import BasePage from '../Base/BasePage'
import Button from '../../page-factory/simple-elements/button'

type Authorization = { login: string; password: string }

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

  public async authorization({ login, password }: Authorization) {
    await this.goto('/')
    await this.emailInput.fill(login)
    await this.passwordInput.fill(password)
    await this.loginBtn.click()
  }
}

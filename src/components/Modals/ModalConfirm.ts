import ModalBase from './ModalBase'
import { Page } from '@playwright/test'

export default class ModalConfirm extends ModalBase {
  public constructor(page: Page) {
    super(page)
  }
}

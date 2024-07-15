import ModalBase from '../../components/Modals/ModalBase'
import { BaseElementProps } from '../../types/page-factory/base-element'
import Icon from '../simple-elements/icon'

export default class ActionIcon extends Icon {
  private readonly modalBase: ModalBase

  public constructor({ page, selector, name }: BaseElementProps) {
    super({ page, selector, name })
    this.modalBase = new ModalBase(page)
  }

  public async click() {
    await super.click()
    await this.modalBase.checkVisibleModal()
  }
}

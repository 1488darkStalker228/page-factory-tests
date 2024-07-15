import { Locator, Page } from '@playwright/test'

//Используется в абстрактном классе BaseElement, а именно типизирует то, что мы будем класть в конструктор этого абстрактного класса;
export type BaseElementProps = {
  page: Page
  selector: string
  name?: string
  searchIn?: Locator
}

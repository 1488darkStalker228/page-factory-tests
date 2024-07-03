import { Locator, Page } from '@playwright/test'

/*
Описывает какой-то объект, тип ключей которого может иметь 3 перечисленных типа;
Это тип для объекта, содержащего локатор;
*/
export type SelectorContext = { [key: string]: string | boolean | number }

//Используется в абстрактном классе BaseElement, а именно типизирует то, что мы будем класть в конструктор этого абстрактного класса;
export type BaseElementProps = {
  page: Page
  selector: string
  name?: string
}

/* 
Позволяет сформировать некий объект, но если у него будет ключ selector, то оно обязательно будет string;
Используется в абстрактном классе BaseElement, для типизации параметра функции получения локатора;
*/
export type SelectorProps = { selector?: string } & SelectorContext

export type ElementAttribute = { name: string; value: string }

import { SelectorContext } from '../types/page-factory/base-element'

/*  
Функция которая возвращает селектор-строку. Есть возможность подстановки динамических параметров. Реализовать можно по-разному;
С помощью этой штуки можно сварить один объект из нескольких;
*/
export default function selectorStringHandler(
  selectorString: string,
  { ...context }: SelectorContext
): string {
  let selector: string = selectorString
  for (const [key, value] of Object.entries(context)) {
    selector = selector.replace(`{${key}}`, value.toString())
  }
  return selector
}

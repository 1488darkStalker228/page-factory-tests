import { Fixtures } from '@playwright/test'

//Формирует один объект из нескольких с нужным типом;
export default function combineFixtures(...args: Fixtures[]): Fixtures {
  return args.reduce((acc, fixture) => ({ ...acc, ...fixture }), {})
}

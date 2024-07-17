import { Fixtures } from '@playwright/test'

export default function combineFixtures(...args: Fixtures[]): Fixtures {
  return args.reduce((acc, fixture) => ({ ...acc, ...fixture }), {})
}

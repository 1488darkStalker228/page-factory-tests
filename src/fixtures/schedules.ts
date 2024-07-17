import { Fixtures, test as base } from '@playwright/test'
import SchedulesListPage from '../pages/Schedules/SchedulesListPage'
import { extendedPageFixture, ExtendedPageFixture } from './page'
import combineFixtures from '../utils/combine-fixtures'

type SchedulesFixtures = {
  schedulesListPage: SchedulesListPage
}

const schedulesFixtures: Fixtures<SchedulesFixtures, ExtendedPageFixture> = {
  async schedulesListPage({ page }, use) {
    await use(new SchedulesListPage(page))
  }
}

export const test = base.extend<ExtendedPageFixture, SchedulesFixtures>(
  combineFixtures(extendedPageFixture, schedulesFixtures)
)

import { test as base } from '@playwright/test'
import { APIRequestContext, Fixtures } from '@playwright/test'
import PlayersListPage from '../pages/Players/PlayersListPage'
import PlayerEditorPage from '../pages/Players/PlayerEditorPage'
import { extendedPageFixture, ExtendedPageFixture } from './page'
import combineFixtures from '../utils/combine-fixtures'

type PlayersFixtures = {
  playersListPage: PlayersListPage
  playerEditorPage: PlayerEditorPage
}

const playersFixtures: Fixtures<
  PlayersFixtures,
  ExtendedPageFixture,
  { request: APIRequestContext }
> = {
  async playersListPage({ page, request }, use) {
    await use(new PlayersListPage(page, request))
  },
  async playerEditorPage({ page }, use) {
    await use(new PlayerEditorPage(page))
  }
}

export const test = base.extend<ExtendedPageFixture, PlayersFixtures>(
  combineFixtures(extendedPageFixture, playersFixtures)
)

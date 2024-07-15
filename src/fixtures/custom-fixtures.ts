import { APIRequestContext, Fixtures, Page, PlaywrightTestArgs, request } from '@playwright/test'
import AuthorizationPage from '../pages/Authorization/AuthorizationPage'
import mockStaticRecourses from '../utils/mocks/static-mock'
import PlayersListPage from '../pages/Players/PlayersListPage'
import PlayerEditorPage from '../pages/Players/PlayerEditorPage'

/*
Это расширение базовой фикстуры page;
Создаём объект типа Fixtures, а этот тип принимает в себя в качестве аргументов другие типы.
 На выходе эта конструкция выглядит так: { contextPage: [AsyncFunction: contextPage] };
*/
export type ContextPageFixture = {
  contextPage: Page
}

export const contextPageFixture: Fixtures<ContextPageFixture, PlaywrightTestArgs> = {
  async contextPage({ page }, use) {
    await mockStaticRecourses(page)
    await use(page)
  }
}

export type CustomFixtures = {
  request: APIRequestContext
  authorizationPage: AuthorizationPage
  playersListPage: PlayersListPage
  playerEditorPage: PlayerEditorPage
}

export const customFixtures: Fixtures<CustomFixtures, ContextPageFixture> = {
  async authorizationPage({ contextPage }, use) {
    await use(new AuthorizationPage(contextPage))
  },
  async playersListPage({ contextPage, request }, use) {
    await use(new PlayersListPage(contextPage, request))
  },
  async playerEditorPage({ contextPage }, use) {
    await use(new PlayerEditorPage(contextPage))
  }
}

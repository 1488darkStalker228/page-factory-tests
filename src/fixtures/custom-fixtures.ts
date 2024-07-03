import { APIRequestContext, Fixtures, Page, PlaywrightTestArgs } from '@playwright/test'
import AuthorizationPage from '../pages/Authorization/AuthorizationPage'
import AppSidebar from '../components/App/AppSidebar'
import PlayersActor from '../actors/playersActor'
import mockStaticRecourses from '../utils/mocks/static-mock'
import PlayersListPage from '../pages/Players/PlayersListPage'
import ModalCreateNewPlayer from '../components/Modals/ModalCreateNewPlayer'

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
  playersActor: PlayersActor
  authorizationPage: AuthorizationPage
  appSidebar: AppSidebar
  playersListPage: PlayersListPage
  modalCreateNewPlayer: ModalCreateNewPlayer
}

export const customFixtures: Fixtures<CustomFixtures, ContextPageFixture> = {
  async authorizationPage({ contextPage }, use) {
    await use(new AuthorizationPage(contextPage))
  },
  async playersActor({ contextPage, request }, use) {
    await use(new PlayersActor(contextPage, request))
  },
  async appSidebar({ contextPage }, use) {
    await use(new AppSidebar(contextPage))
  },
  async playersListPage({ contextPage }, use) {
    await use(new PlayersListPage(contextPage))
  },
  async modalCreateNewPlayer({ contextPage }, use) {
    await use(new ModalCreateNewPlayer(contextPage))
  }
}

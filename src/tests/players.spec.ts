import { test } from './add-fuxtures'

export type PlayerData = { [key: string]: string }

test.describe('Tests of Players section', () => {
  test.beforeEach(async ({ authorizationPage }) => {
    await test.step('Авторизация', async () => {
      await authorizationPage.authorization()
    })
  })

  test('Create player', async ({ playersListPage, playerEditorPage, page }) => {
    const playerData: PlayerData = {
      name: 'test-player__autotests',
      address: 'Ростов-на-Дону',
      storeNumber: '1',
      divisionCode: '1',
      workMode: 'work-mode__autotests',
      settingsProfile: 'settings-profile__autotests',
      schedule: 'edit-player-schedules-page__autotests'
    }

    await test.step('Шаг 1: Перейти в папку для создания плеера', async () => {
      await playersListPage.gotoPageAndFolder('create-player__autotests')
    })
    await test.step('Шаг 2: Кликнуть по иконке создания плеера', async () => {
      await playersListPage.createPlayerIcon.click()
    })
    await test.step('Шаг 3: Заполнить название', async () => {
      await playersListPage.modalCreateNewPlayer.nameInput.fill(playerData.name)
    })
    await test.step('Шаг 4: Заполнить адрес', async () => {
      await playersListPage.modalCreateNewPlayer.addressDropdown.fillAddress(playerData.address)
    })
    await test.step('Шаг 5: Заполнить номер магазина', async () => {
      await playersListPage.modalCreateNewPlayer.storeNumberInput.fill(playerData.storeNumber)
    })
    await test.step('Шаг 6: Заполнить код подразделения', async () => {
      await playersListPage.modalCreateNewPlayer.divisionCodeInput.fill(playerData.divisionCode)
    })
    await test.step('Шаг 7: Добавить режим работы', async () => {
      await playersListPage.modalCreateNewPlayer.workModeDropdown.selectItemFromDropdown(
        playerData.workMode
      )
    })
    await test.step('Шаг 8: Добавить профиль настроек', async () => {
      await playersListPage.modalCreateNewPlayer.settingsProfileDropdown.selectItemFromDropdown(
        playerData.settingsProfile
      )
    })
    await test.step('Шаг 9: Добавить расписание', async () => {
      await playersListPage.modalCreateNewPlayer.scheduleDropdown.selectItemFromDropdown(
        playerData.schedule
      )
    })
    await test.step('Шаг 10: Добавить медиапланы', async () => {
      await playersListPage.modalCreateNewPlayer.mediaPlansDropdown.selectItemsFromMultipleDropdown()
    })
    await test.step('Шаг 11: Добавить критерии', async () => {
      await playersListPage.modalCreateNewPlayer.clickOnCriteriaInput()
      await playersListPage.modalCreateNewPlayer.modalTreeItems.selectCriteria()
    })
    await test.step('Шаг 12: Нажать на кнопку создания плеера', async () => {
      await playersListPage.modalCreateNewPlayer.clickOnConfirmBtn('paged')
    })
    await test.step('Шаг 13: Проверить данных на вкладках плеера', async () => {
      await playerEditorPage.setAuthorizationKey()
      await playerEditorPage.checkTabsData(playerData)
    })
    await test.step('Шаг 14: Перейти в родительскую папку', async () => {
      await playerEditorPage.clickOnLastBreadCrumb()
    })
    await test.step('Шаг 15: Проверить данные в айтеме', async () => {
      await playersListPage.checkItemData({
        authorizationKey: playerEditorPage.authorizationKey,
        ...playerData
      })
    })
    await test.step('Шаг 16: Удалить созданные тестовые сущности', async () => {
      await playersListPage.deleteItem(playersListPage.deletePlayerOrFolderIcon.getLocator())
    })
  })
})

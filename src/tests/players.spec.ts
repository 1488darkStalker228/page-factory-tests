import { test } from './add-fuxtures'

test.describe('Tests of Players section', () => {
  test.beforeEach(async ({ authorizationPage }) => {
    await authorizationPage.authorization()
  })

  test('Create player', async ({ playersActor, playersListPage, modalCreateNewPlayer, page }) => {
    await playersActor.gotoPageAndFolder('create-player__autotests')

    await playersListPage.createEntityBlock.click()

    await modalCreateNewPlayer.nameInput.fill()

    // await modalCreateNewPlayer.addressDropdown.fillAddress()
    //
    // await modalCreateNewPlayer.storeNumberInput.fill()
    //
    // await modalCreateNewPlayer.divisionCodeInput.fill()
    //
    // await modalCreateNewPlayer.workModeDropdown.selectItemFromDropdown('work-mode__autotests')
    //
    // await modalCreateNewPlayer.settingsProfileDropdown.selectItemFromDropdown(
    //   'settings-profile__autotests'
    // )
    //
    // await modalCreateNewPlayer.scheduleDropdown.selectItemFromDropdown(
    //   'edit-player-schedules-page__auto-tests'
    // )

    await modalCreateNewPlayer.mediaPlansDropdown.selectItemsFromMultipleDropdown()

    await page.waitForTimeout(5000)
  })
})

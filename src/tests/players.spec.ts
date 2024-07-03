import { test } from './add-fuxtures'

test.describe('Tests of Players section', () => {
  test.beforeEach(async ({ authorizationPage }) => {
    await authorizationPage.authorization()
  })

  test('Create player', async ({ playersActor, playersListPage, modalCreateNewPlayer, page }) => {
    await playersActor.gotoPageAndFolder('create-player__autotests')

    await playersListPage.createEntityBlock.click()

    await modalCreateNewPlayer.nameInput.fill()

    await modalCreateNewPlayer.fillAddress()

    await modalCreateNewPlayer.storeNumberInput.fill()

    await modalCreateNewPlayer.divisionCodeInput.fill()
    await page.waitForTimeout(5000)
  })
})

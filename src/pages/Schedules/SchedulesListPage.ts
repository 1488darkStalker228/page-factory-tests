import { Page } from '@playwright/test'
import BasePage from '../Base/BasePage'

export default class SchedulesListPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  // public async gotoPage() {
  //   await this.page.route(
  //     'https://bg-schedules-test.cubicservice.ru/v1/schedules/paged',
  //     async (route) => {
  //       const response = await route.fetch()
  //       const json = await response.json()
  //       json.items = [
  //         {
  //           id: 140,
  //           name: 'nik-rmp5',
  //           published: true,
  //           createdUtc: '2021-02-04T17:01:52.370034',
  //           updatedUtc: '2024-08-14T13:04:48.829411'
  //         }
  //       ]
  //       await route.fulfill({ response, json })
  //     }
  //   )
  //   await this.appSidebar.gotoPage()
  // }

  public async gotoPage() {
    const responsePromise = this.page.waitForResponse((response) => {
      return (
        response.url() === 'https://bg-schedules-test.cubicservice.ru/v1/schedules/paged' &&
        response.status() === 200
      )
    })
    await this.appSidebar.gotoPage()
    const tmp = await responsePromise
    console.log(await tmp.json())
    await this.page.locator('[class="ui-table-items-row__field"] >> nth=0').click()
  }
}

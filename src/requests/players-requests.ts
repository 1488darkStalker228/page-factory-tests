import { APIRequestContext, APIResponse, Page } from '@playwright/test'
import getCmsAccessToken from '../utils/get-cms-access-token'

export default class PlayersRequests {
  constructor(
    readonly page: Page,
    readonly request: APIRequestContext
  ) {}

  public async paged(searchQuery?: string): Promise<number> {
    const response: APIResponse = await this.request.post(
      'https://players2-test.cubicservice.ru/v1/folders/paged',
      {
        headers: {
          Authorization: await getCmsAccessToken(this.page)
        },
        data: {
          name: searchQuery,
          order: [
            {
              field: 'name',
              direction: 'asc'
            }
          ],
          orgId: 1,
          page: 1,
          pageItemCount: 10
        }
      }
    )
    return (await response.json()).itemCount
  }
}

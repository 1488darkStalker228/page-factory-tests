import { test } from './add-fuxtures'

test('Testing authorization on authorization page', async ({ contextPage, authorizationPage }) => {
  await authorizationPage.authorization()
})

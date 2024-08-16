import { test } from '@fixtures/schedules'

test.describe('Tests of Schedules section', () => {
  test('Create schedule', async ({ schedulesListPage }) => {
    await test.step('Шаг 1: Перейти в раздел "Расписания"', async () => {
      await schedulesListPage.gotoPage()
    })
  })
})

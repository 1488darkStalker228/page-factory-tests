import { test as base } from '@playwright/test'
import { ContextPageFixture, contextPageFixture } from '../fixtures/custom-fixtures'
import { CustomFixtures, customFixtures } from '../fixtures/custom-fixtures'

import combineFixtures from '../fixtures/combine-fixtures'

export const test = base.extend<ContextPageFixture, CustomFixtures>(
  combineFixtures(contextPageFixture, customFixtures)
)

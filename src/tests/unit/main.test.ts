import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { OptiprismBrowser } from '@/index'
import { LocalStorage } from '@/modules/localStorage'
import { LogLevel } from '@/utils/logLevel'

describe('OptiPrism class', () => {
  let optiprism: OptiprismBrowser

  beforeEach(() => {
    optiprism = new OptiprismBrowser({ loggerLevel: LogLevel.Warnings })
  })

  it('should have token in own config after initializing', () => {
    const TEST_TOKEN = faker.string.uuid()

    optiprism.configure({
      token: TEST_TOKEN,
    })

    expect(optiprism.config).toEqual(expect.objectContaining({ token: TEST_TOKEN }))
  })

  it('should have log error when token is not exist', () => {
    optiprism.configure({
      token: '',
    })

    expect(optiprism.__logger._lastLog.object?.type).toEqual('error')
    expect(optiprism.__logger._lastLog.object?.args[0]).toEqual('Token is required')
  })

  it('should call sendBeacon when track is called', async () => {
    global.navigator.sendBeacon = vi.fn(() => true)

    optiprism.configure({
      token: faker.string.uuid(),
      autotrack: false,
    })
    await optiprism.track('click')

    expect(navigator.sendBeacon).toHaveBeenCalledTimes(1)
  })

  it('should have anonymousId from local storage', () => {
    const TEST_ANONYMOUS_ID = faker.string.uuid()
    vi.spyOn(LocalStorage, 'get').mockReturnValue(TEST_ANONYMOUS_ID)

    optiprism.configure({
      token: faker.string.uuid(),
      autotrack: false,
    })

    expect(optiprism.config.anonymousId).toEqual(TEST_ANONYMOUS_ID)
  })

  it('should call identify method with correct args when method is called for user', async () => {
    global.navigator.sendBeacon = vi.fn(() => true)
    const identifyMock = vi.spyOn(optiprism.__apiClient.tracking, 'identifyEvent')
    const TEST_FULL_NAME = faker.person.fullName()
    const TEST_TOKEN = faker.string.uuid()

    optiprism.configure({
      token: TEST_TOKEN,
      autotrack: false,
    })
    await optiprism.user?.identify(TEST_FULL_NAME)

    expect(identifyMock).toHaveBeenCalledTimes(1)
    expect(identifyMock.mock.calls[0][0]).toEqual(TEST_TOKEN)
    expect(identifyMock.mock.calls[0][1]?.group).toEqual('user')
    expect(identifyMock.mock.calls[0][1]?.id).toEqual(TEST_FULL_NAME)
  })

  it('should call identify method with correct args when method is called for group', async () => {
    global.navigator.sendBeacon = vi.fn(() => true)
    const identifyMock = vi.spyOn(optiprism.__apiClient.tracking, 'identifyEvent')
    const TEST_COMPANY_NAME = faker.company.name()
    const TEST_FULL_NAME = faker.person.fullName()
    const TEST_TOKEN = faker.string.uuid()

    optiprism.configure({
      token: TEST_TOKEN,
      autotrack: false,
    })
    await optiprism.group?.identify(TEST_COMPANY_NAME, TEST_FULL_NAME)

    expect(identifyMock).toHaveBeenCalledTimes(1)
    expect(identifyMock.mock.calls[0][0]).toEqual(TEST_TOKEN)
    expect(identifyMock.mock.calls[0][1]?.group).toEqual(TEST_COMPANY_NAME)
    expect(identifyMock.mock.calls[0][1]?.id).toEqual(TEST_FULL_NAME)
  })

  it('should call track with correct args when user is identified', async () => {
    global.navigator.sendBeacon = vi.fn(() => true)
    const identifyMock = vi.spyOn(optiprism.__apiClient.tracking, 'trackEvent')
    const TEST_FULL_NAME = faker.person.fullName()
    const TEST_TOKEN = faker.string.uuid()

    optiprism.configure({
      token: TEST_TOKEN,
      autotrack: false,
    })
    await optiprism.user?.identify(TEST_FULL_NAME)
    await optiprism.track('click')

    expect(identifyMock.mock.calls[0][0]).toEqual(TEST_TOKEN)
    expect(identifyMock.mock.calls[0][1]?.userId).toEqual(TEST_FULL_NAME)
  })

  it('should call track with correct args when groups are identified', async () => {
    global.navigator.sendBeacon = vi.fn(() => true)
    const identifyMock = vi.spyOn(optiprism.__apiClient.tracking, 'trackEvent')
    const TEST_COMPANY_NAME_1 = faker.company.name()
    const TEST_COMPANY_NAME_2 = faker.company.name()
    const TEST_FULL_NAME_1 = faker.person.fullName()
    const TEST_FULL_NAME_2 = faker.person.fullName()
    const TEST_TOKEN = faker.string.uuid()

    optiprism.configure({
      token: TEST_TOKEN,
      autotrack: false,
    })
    await optiprism.group?.identify(TEST_COMPANY_NAME_1, TEST_FULL_NAME_1)
    await optiprism.group?.identify(TEST_COMPANY_NAME_2, TEST_FULL_NAME_2)
    await optiprism.track('click')

    expect(identifyMock.mock.calls[0][0]).toEqual(TEST_TOKEN)
    expect(identifyMock.mock.calls[0][1]?.groups).toEqual({
      [TEST_COMPANY_NAME_1]: TEST_FULL_NAME_1,
      [TEST_COMPANY_NAME_2]: TEST_FULL_NAME_2,
    })
  })
})

import { faker } from '@faker-js/faker'
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest'

import { ANONYMOUS_ID_KEY } from '@/constants'
import { OptiprismBrowser } from '@/index'
import { LogLevel } from '@/utils/logLevel'

describe('OptiPrism class should', () => {
  let optiprism: OptiprismBrowser
  const TEST_TOKEN = faker.string.uuid()

  beforeEach(() => {
    optiprism = new OptiprismBrowser({ loggerLevel: LogLevel.Warnings })
    global.navigator.sendBeacon = vi.fn(() => true)
    window.localStorage.clear()
  })

  it('have token in own config after initializing', () => {
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
    })

    expect(optiprism.config).toEqual(expect.objectContaining({ token: TEST_TOKEN }))
  })

  it('have log error when token is not exist', () => {
    optiprism.configure({
      token: '',
      serverUrl: faker.internet.url(),
    })

    expect(optiprism.__logger._lastLog.object?.type).toEqual('error')
    expect(optiprism.__logger._lastLog.object?.args[0]).toEqual('Token is required')
  })

  it('call sendBeacon when track is called', async () => {
    optiprism.configure({
      token: faker.string.uuid(),
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    await optiprism.track('click')

    expect(navigator.sendBeacon).toHaveBeenCalledTimes(1)
  })

  it('have anonymousId from local storage', () => {
    optiprism.configure({
      token: faker.string.uuid(),
      serverUrl: faker.internet.url(),
      autotrack: false,
    })

    expect(JSON.stringify(optiprism.config.anonymousId)).toEqual(
      window.localStorage.getItem(ANONYMOUS_ID_KEY)
    )
  })

  it('call identify method with correct args when method is called for user', async () => {
    const TEST_FULL_NAME = faker.person.fullName()
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const identifyMock = vi.spyOn(optiprism.apiClient.tracking, 'identifyEvent')

    await optiprism.user?.identify(TEST_FULL_NAME)

    expect(identifyMock).toHaveBeenCalledTimes(1)
    expect(identifyMock.mock.calls[0][1]?.group).toEqual('user')
    expect(identifyMock.mock.calls[0][1]?.id).toEqual(TEST_FULL_NAME)
  })

  it('call identify method with correct args when method is called for group', async () => {
    const TEST_COMPANY_NAME = faker.company.name()
    const TEST_FULL_NAME = faker.person.fullName()
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiIdentifyMockInstance = vi.spyOn(optiprism.apiClient.tracking, 'identifyEvent')

    await optiprism.group?.identify(TEST_COMPANY_NAME, TEST_FULL_NAME)

    expect(apiIdentifyMockInstance).toHaveBeenCalledTimes(1)
    expect(apiIdentifyMockInstance.mock.calls[0][1]?.group).toEqual(TEST_COMPANY_NAME)
    expect(apiIdentifyMockInstance.mock.calls[0][1]?.id).toEqual(TEST_FULL_NAME)
  })

  it('call track with correct args when user is identified', async () => {
    const TEST_FULL_NAME = faker.person.fullName()
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    await optiprism.user?.identify(TEST_FULL_NAME)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.userId).toEqual(TEST_FULL_NAME)
  })

  it('call track with correct args when groups are identified', async () => {
    const TEST_COMPANY_NAME_1 = faker.company.name()
    const TEST_COMPANY_NAME_2 = faker.company.name()
    const TEST_FULL_NAME_1 = faker.person.fullName()
    const TEST_FULL_NAME_2 = faker.person.fullName()
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    await optiprism.group?.identify(TEST_COMPANY_NAME_1, TEST_FULL_NAME_1)
    await optiprism.group?.identify(TEST_COMPANY_NAME_2, TEST_FULL_NAME_2)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.groups).toEqual({
      [TEST_COMPANY_NAME_1]: TEST_FULL_NAME_1,
      [TEST_COMPANY_NAME_2]: TEST_FULL_NAME_2,
    })
  })

  it('pass super props to track when called register method', async () => {
    const TEST_SUPER_PROPS_KEY = 'location'
    const TEST_SUPER_PROP_VALUE = faker.location.country()
    const TEST_SUPER_PROPS = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE }
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    optiprism.register(TEST_SUPER_PROPS)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.properties).toEqual(TEST_SUPER_PROPS)
  })

  it('pass super props to track when called register_once method', async () => {
    const TEST_SUPER_PROPS_KEY = 'location'
    const TEST_SUPER_PROP_VALUE = faker.location.country()
    const TEST_SUPER_PROPS = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE }
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    optiprism.register_once(TEST_SUPER_PROPS)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.properties).toEqual(TEST_SUPER_PROPS)
  })

  it('NOT overwrite super props when called register_once method again', async () => {
    const TEST_SUPER_PROPS_KEY = 'location'
    const TEST_SUPER_PROP_VALUE = faker.location.country()
    const TEST_SUPER_PROP_VALUE_2 = faker.location.city()
    const TEST_SUPER_PROPS = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE }
    const TEST_SUPER_PROPS_2 = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE_2 }
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    optiprism.register_once(TEST_SUPER_PROPS)
    optiprism.register_once(TEST_SUPER_PROPS_2)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.properties).toEqual(TEST_SUPER_PROPS)
    expect(apiTrackMock.mock.calls[0][1]?.properties).not.toEqual(TEST_SUPER_PROPS_2)
  })

  it('overwrite super props when called register method again', async () => {
    const TEST_SUPER_PROPS_KEY = 'location'
    const TEST_SUPER_PROP_VALUE = faker.location.country()
    const TEST_SUPER_PROP_VALUE_2 = faker.location.city()
    const TEST_SUPER_PROPS = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE }
    const TEST_SUPER_PROPS_2 = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE_2 }
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    optiprism.register(TEST_SUPER_PROPS)
    optiprism.register(TEST_SUPER_PROPS_2)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.properties).toEqual(TEST_SUPER_PROPS_2)
    expect(apiTrackMock.mock.calls[0][1]?.properties).not.toEqual(TEST_SUPER_PROPS)
  })

  it('remove super props when called unregister method', async () => {
    const TEST_SUPER_PROPS_KEY = 'location'
    const TEST_SUPER_PROPS_KEY_2 = 'location_2'
    const TEST_SUPER_PROP_VALUE = faker.location.country()
    const TEST_SUPER_PROP_VALUE_2 = faker.location.city()
    const TEST_SUPER_PROPS = { [TEST_SUPER_PROPS_KEY]: TEST_SUPER_PROP_VALUE }
    const TEST_SUPER_PROPS_2 = { [TEST_SUPER_PROPS_KEY_2]: TEST_SUPER_PROP_VALUE_2 }
    optiprism.configure({
      token: TEST_TOKEN,
      serverUrl: faker.internet.url(),
      autotrack: false,
    })
    const apiTrackMock: MockInstance = vi.spyOn(optiprism.apiClient.tracking, 'trackEvent')

    optiprism.register(TEST_SUPER_PROPS)
    optiprism.register_once(TEST_SUPER_PROPS_2)
    optiprism.unregister(TEST_SUPER_PROPS_KEY)
    optiprism.unregister(TEST_SUPER_PROPS_KEY_2)
    await optiprism.track('click')

    expect(apiTrackMock.mock.calls[0][1]?.properties[TEST_SUPER_PROPS_KEY]).toBeUndefined()
    expect(apiTrackMock.mock.calls[0][1]?.properties[TEST_SUPER_PROPS_KEY_2]).toBeUndefined()
    expect(apiTrackMock.mock.calls[0][1]?.properties[TEST_SUPER_PROPS_KEY]).not.toEqual(
      TEST_SUPER_PROP_VALUE
    )
    expect(apiTrackMock.mock.calls[0][1]?.properties[TEST_SUPER_PROPS_KEY]).not.toEqual(
      TEST_SUPER_PROP_VALUE_2
    )
  })
})

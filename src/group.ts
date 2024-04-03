import { Logger as LoggerType, PropertyName, PropertyValue } from './types'
import { trackService } from './transports'
import { Logger } from './utils/logger'
import { getTrackContext } from './modules/getTrackContext'

const logTextMap = {
  setOnce: 'group setOnce',
  set: 'group set',
  identify: 'group identify',
}

export class Group {
  logger: LoggerType
  constructor() {
    this.logger = new Logger()
  }
  appendToList(groupType: string, data: Map<PropertyName, PropertyValue>): void {}
  removeFromList(groupType: string, data: Map<PropertyName, PropertyValue>): void {}
  increment(groupType: string, data: Map<PropertyName, number>): void {}
  decrement(groupType: string, data: Map<PropertyName, number>): void {}
  async identify(groupType: string, groupId: string, props?: Map<PropertyName, PropertyValue>) {
    try {
      const res = await trackService.trackGroupIdentify(
        {
          context: getTrackContext(),
          properties: props,
        },
        groupType,
        groupId
      )
      this.logger.info(logTextMap.identify, res)
    } catch (e) {
      this.logger.error(logTextMap.identify, JSON.stringify(e))
    }
  }
  async set(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>) {
    try {
      const res = await trackService.trackGroupSet(
        {
          context: getTrackContext(),
          operations: data,
        },
        groupType,
        groupId
      )
      this.logger.info(logTextMap.set, res)
    } catch (e) {
      this.logger.error(logTextMap.set, JSON.stringify(e))
    }
  }
  async setOnce(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>) {
    try {
      const res = await trackService.trackGroupSet(
        {
          context: getTrackContext(),
          operations: data,
        },
        groupType,
        groupId
      )
      this.logger.info(logTextMap.setOnce, res)
    } catch (e) {
      this.logger.error(logTextMap.setOnce, JSON.stringify(e))
    }
  }
  unset(groupType: string, properties: PropertyName[]): void {}
}

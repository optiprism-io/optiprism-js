import {
    PropertyName,
    PropertyValue,
    Logger as LoggerType,
} from './types';
import { trackService } from './transports'
import store from './utils/store';
import { Logger } from './utils/logger';

const logTextMap = {
    setOnce: 'group setOnce',
    set: 'group set',
    identify: 'group identify',
};

export class Group {
    logger: LoggerType
    constructor() {
        this.logger = new Logger();
    }
    appendToList(groupType: string,data: Map<PropertyName, PropertyValue>): void {}
    removeFromList(groupType: string,data: Map<PropertyName, PropertyValue>): void {}
    increment(groupType: string,data: Map<PropertyName, number>): void {}
    decrement(groupType: string,data: Map<PropertyName, number>): void {}
    async identify(groupType: string, groupId: string, props?: Map<PropertyName, PropertyValue>) {
        try {
            const res = await trackService.trackGroupIdentify({
                context: store.getTrackContext(),
                properties: props,
            }, groupType, groupId);
            this.logger.info(logTextMap.identify, res);
        } catch (e) {
            this.logger.error(logTextMap.identify, JSON.stringify(e));
        }
    }
    async set(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>) {
        try {
            const res = await trackService.trackGroupSet({
                context: store.getTrackContext(),
                operations: data,
            }, groupType, groupId)
            this.logger.info(logTextMap.set, res);
        } catch (e) {
            this.logger.error(logTextMap.set, JSON.stringify(e));
        }
    }
    async setOnce(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>) {
        try {
            const res = await trackService.trackGroupSet({
                context: store.getTrackContext(),
                operations: data,
            }, groupType, groupId);
            this.logger.info(logTextMap.setOnce, res);

        } catch (e) {
            this.logger.error(logTextMap.setOnce, JSON.stringify(e));
        }
    }
    unset(groupType: string, properties: PropertyName[]): void {}
}
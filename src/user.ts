import {
    PropertyName,
    PropertyValue,
    Logger as LoggerType,
} from './types';
import { trackService } from './transports'
import store from './utils/store';
import { Logger } from './utils/logger';

const logTextMap = {
    set: 'user set',
    setOnce: 'user setOnce',
    identify: 'user identify',
    trackUserIdentify: 'trackUserIdentify',
    alias: 'alias',
    optOut: 'optOut',
    optIn: 'optIn',
};

export class User {
    logger: LoggerType
    constructor() {
        this.logger = new Logger();
    }
    appendToList(data: Map<PropertyName, PropertyValue>): void {}
    removeFromList(data: Map<PropertyName, PropertyValue>): void {}
    increment(data: Map<PropertyName, number>): void {}
    decrement(data: Map<PropertyName, number>): void {}
    async set(data: Map<PropertyName, PropertyValue>) {
        try {
            const res = await trackService.trackUserSet({
                context: store.getTrackContext(),
                operations: data,
            }, store.userId || store.anonymousId)
            this.logger.info(logTextMap.set, res);
        } catch (e) {
            this.logger.error(logTextMap.set, JSON.stringify(e));
        }
    }
    async setOnce(data: Map<PropertyName, PropertyValue>) {
        try {
            const res = await trackService.trackUserSet({
                context: store.getTrackContext(),
                operations: data,
            }, store.userId || store.anonymousId)
            this.logger.info(logTextMap.setOnce, res);
        } catch (e) {
            this.logger.info(logTextMap.setOnce, JSON.stringify(e));
        }
    }
    unset(properties: PropertyName[]): void {}
    async identify(userId: string, props?: Map<PropertyName, PropertyValue>) {
        store.userId = userId;
        try {
            const res = await trackService.trackUserIdentify({
                context: store.getTrackContext(),
                properties: props,
            }, userId);
            this.logger.info(logTextMap.identify, res);
        } catch (e) {
            this.logger.info(logTextMap.identify, e);
        }
    }
    async alias(newId: string, oldId: string) {
        try {
            const res = await trackService.trackUserAlias({
                context: store.getTrackContext(),
                alias: newId,
            }, oldId || store.userId || store.anonymousId);
            this.logger.info(logTextMap.alias, res);
        } catch (e) {
            this.logger.info(logTextMap.alias, JSON.stringify(e));
        }
    }
    async optOut() {
        try {
            const res = await trackService.trackUserOptOut({}, store.userId || store.anonymousId);
            this.logger.info(logTextMap.optOut, res);
        } catch (e) {
            this.logger.info(logTextMap.optOut, JSON.stringify(e));
        }
    }
    async optIn() {
        try {
            const res = await trackService.trackUserOptIn({}, store.userId || store.anonymousId);
            this.logger.info(logTextMap.optIn, res);
        } catch (e) {
            this.logger.info(logTextMap.optIn, JSON.stringify(e));
        }
    }
}
import { PropertyName, PropertyValue } from './types';
import { trackService } from './transports'
import store from './utils/store';

export class User {
    appendToList(data: Map<PropertyName, PropertyValue>): void {

    }

    removeFromList(data: Map<PropertyName, PropertyValue>): void {

    }

    increment(data: Map<PropertyName, number>): void {

    }

    decrement(data: Map<PropertyName, number>): void {

    }

    async set(data: Map<PropertyName, PropertyValue>) {
        try {
            await trackService.trackUserSet({
                context: store.getTrackContext(),
                operations: data,
            }, store.userId || store.anonymousId)
        } catch (e: any) {
            console.log(e?.message);
        }
    }

    async setOnce(data: Map<PropertyName, PropertyValue>) {
        try {
            await trackService.trackUserSet({
                context: store.getTrackContext(),
                operations: data,
            }, store.userId || store.anonymousId)
        } catch (e: any) {
            console.log(e?.message);
        }
    }

    unset(properties: PropertyName[]): void {

    }

    identify(userId: string, props?: Map<PropertyName, PropertyValue>): void {
        store.userId = userId;
        trackService.trackUserIdentify({
            context: store.getTrackContext(),
            properties: props,
        }, userId);
    }

    alias(newId: string, oldId: string): void {
        trackService.trackUserAlias({
            context: store.getTrackContext(),
            alias: newId,
        }, oldId || store.userId || store.anonymousId)
    }

    optOut(): void {
        trackService.trackUserOptOut({}, store.userId || store.anonymousId);
    }

    optIn(): void {
        trackService.trackUserOptIn({}, store.userId || store.anonymousId);
    }
}
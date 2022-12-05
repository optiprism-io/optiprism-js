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

    set(data: Map<PropertyName, PropertyValue>): void {
        trackService.trackUserSet({
            context: store.getTrackContext(),
            operations: data,
        }, store.userId || store.anonymousId)
    }

    setOnce(data: Map<PropertyName, PropertyValue>): void {

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

    }

    optIn(): void {

    }
}
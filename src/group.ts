import { PropertyName, PropertyValue } from './types';
import { trackService } from './transports'
import store from './utils/store';

export class Group {
    identify(groupType: string, groupId: string, props?: Map<PropertyName, PropertyValue>): void {
        trackService.trackGroupIdentify({
            context: store.getTrackContext(),
            properties: props,
        }, groupType, groupId);
    }

    appendToList(groupType: string,data: Map<PropertyName, PropertyValue>): void {

    }

    removeFromList(groupType: string,data: Map<PropertyName, PropertyValue>): void {

    }

    increment(groupType: string,data: Map<PropertyName, number>): void {

    }

    decrement(groupType: string,data: Map<PropertyName, number>): void {

    }

    set(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>): void {
        trackService.trackGroupSet({
            context: store.getTrackContext(),
            operations: data,
        }, groupType, groupId)
    }

    setOnce(groupType: string, data: Map<PropertyName, PropertyValue>): void {

    }

    unset(groupType: string, properties: PropertyName[]): void {

    }
}
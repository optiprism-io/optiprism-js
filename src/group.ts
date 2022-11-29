import { PropertyName, PropertyValue } from './types';

export class Group {
    identify(groupType: string, groupId: string, props?: Map<PropertyName, PropertyValue>): void {

    }

    appendToList(groupType: string,data: Map<PropertyName, PropertyValue>): void {

    }

    removeFromList(groupType: string,data: Map<PropertyName, PropertyValue>): void {

    }

    increment(groupType: string,data: Map<PropertyName, number>): void {

    }

    decrement(groupType: string,data: Map<PropertyName, number>): void {

    }

    set(groupType: string,data: Map<PropertyName, PropertyValue>): void {

    }

    setOnce(groupType: string,data: Map<PropertyName, PropertyValue>): void {

    }

    unset(groupType: string,properties: PropertyName[]): void {

    }
}
import { PropertyName, PropertyValue } from './types';

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

    }

    setOnce(data: Map<PropertyName, PropertyValue>): void {

    }

    unset(properties: PropertyName[]): void {

    }

    identify(userId: string, props?: Map<PropertyName, PropertyValue>): void {

    }

    alias(newId: string, oldId: string): void {

    }

    optOut(): void {

    }

    optIn(): void {

    }
}
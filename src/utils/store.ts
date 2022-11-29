import mergeObjects from './mergeObjects';
import {
    LogLevel,
    StorageMethod,
    PropertyName,
    PropertyValue
} from '../types';

const store = {
    config: {
        projectId: 0,
        serverUrl: '',
        logLevel: LogLevel.None,
        cookieExpiration: new Date(),
        cookieSecure: false,
        storage: StorageMethod.LocalStorage,
    },
    properties: {},
    deviceId: '',
    groupKey: '',
    groups: null,
    sessionId: null,
    anonymousId: null,
    userId: null,
    optedOut: false,

    setProperties(properties: Map<PropertyName, PropertyValue>) {
        this.properties = mergeObjects(this.properties, properties);
    },
    getProperties() {
        return this.properties;
    },
};

export default store;
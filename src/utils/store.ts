import mergeObjects from './mergeObjects';
import {
    LogLevel,
    StorageMethod,
    PropertyName,
    PropertyValue,
    TrackContext,
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
    sessionId: '',
    anonymousId: '',
    userId: '',
    optedOut: false,

    setProperties(properties: Map<PropertyName, PropertyValue>) {
        this.properties = mergeObjects(this.properties, properties);
    },
    getTrackContext(): TrackContext {
        // TODO
        return {
            userAgent: navigator.userAgent,
            locale: navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language
        }
    },
    getProperties() {
        return this.properties;
    },
};

export default store;
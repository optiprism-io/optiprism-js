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
        const context: TrackContext = {
            userAgent: navigator.userAgent,
            locale: navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language,
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            timezone: String(new Date().getTimezoneOffset() / 60),
        };

        if (location) {
            context.page = {
                path: location.pathname,
                referer: document.referrer,
                search: location.search,
                title: document.title,
                url: location.href,
            };
        }
        return context;
    },
    getProperties() {
        return this.properties;
    },
};

export default store;
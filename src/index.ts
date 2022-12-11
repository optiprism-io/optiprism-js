import {
    Config,
    OptiPrism,
    User as UserType,
    Group as GroupType,
    PropertyName,
    PropertyValue,
    TrackOptions,
    LogLevel,
    StorageMethod,
    TrackContext,
} from './types';
import { trackService } from './transports';

import { getGlobalScope } from './utils/globalScope'
import mergeObjects from './utils/mergeObjects';
import store from './utils/store';
import { UUID } from './utils/uuid';

import { Group } from './group';
import { User } from './user';

export class OptiprismBrowser {
    user: UserType
    group: GroupType
    constructor() {
        this.group = new Group();
        this.user = new User();
    }
    _getTrackContext(): TrackContext {
        // TODO
        return {
            userAgent: navigator.userAgent,
            locale: navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language
        }
    }
    async _sendTrackOnClick(item: {
        element: string
        name: string | null
        id: string | null
        class: string | null
        properties?: Map<PropertyName, PropertyValue>,
    }) {
        const props = item;
        const getTrackContext = this._getTrackContext;

        return async function sendTrack() {
            try {
                await trackService.trackClick({
                    context: getTrackContext(),
                    ...props,
                });
                // TODO logger
            } catch (e) {}
        }
    }
    reset() {
        store.config = {
            projectId: 0,
            serverUrl: '',
            logLevel: LogLevel.None,
            cookieExpiration: new Date(),
            cookieSecure: false,
            storage: StorageMethod.LocalStorage,
        };
        store.anonymousId = UUID();
        store.sessionId = UUID();
        store.properties = {};
        store.userId = '';
    }
    configure(config: Config): void {
        if (!store.deviceId) {
            store.deviceId = UUID();
        }
        if (!store.anonymousId) {
            store.anonymousId = UUID();
            store.sessionId = UUID();
        }

        store.config = mergeObjects(store.config, config);
    }
    async page(props?: Map<PropertyName, PropertyValue>) {
        try {
            await trackService.trackPage({
                context: store.getTrackContext(),
                path: 'string',
                referer: 'string',
                search: 'string',
                title: 'string',
                url: 'string',
                properties: props,
            });
            // TODO logget
        } catch (e) {}
    }
    register(data: Map<PropertyName, PropertyValue>): void {
        store.setProperties(data);
    }
    unregister(data: Map<PropertyName, PropertyValue>): void {
        const properties = store.properties;
        // @ts-ignore
        Object.keys(data).forEach(key => delete properties[key]);
        store.properties = properties;
    }
    async trackOnClick(el: HTMLElement, eventName: string, properties?: Map<PropertyName, PropertyValue>, options?: TrackOptions) {
        if (el) {
            const track = await this._sendTrackOnClick({
                element: el.tagName as string,
                name: el.getAttribute('name'),
                id: el.getAttribute('id'),
                class: el.getAttribute('class'),
                properties: properties,
            });
            el.addEventListener('click', track);
        }
    }
    async track(eventName: string, properties?: Map<PropertyName, PropertyValue>, options?: TrackOptions) {
        try {
            await trackService.trackEvent({
                context: this._getTrackContext(),
                eventName: eventName,
                properties: properties,
            });
            // TODO logger
        } catch (e) {}
    }
}

export const createInstance = (): OptiPrism => {
    const client = new OptiprismBrowser();
    return client;
}

export default createInstance();

const globalScope = getGlobalScope();
if (globalScope) {
    // @ts-ignore
    globalScope.optiprism = createInstance();
}
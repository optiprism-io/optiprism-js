import { PropertyName, PropertyValue } from './'

export interface TrackContext {
    anonymousId?: string
    userId?: string
    timestamp?: string
    app?: {
        name: string
        version: string
        build: string
        namespace: string
    },
    campaign?: {
        name: string
        source: string
        medium: string
        term: string
        content: string
    },
    device?: {
        id: string
        vendor: string
        model: string
        name: string
        platform: string
    },
    ip?: string,
    userAgent: string
    library?: {
        version: string
    }
    locale: string,
    location?: {
        city: string
        country: string
    }
    network?: {
        carrier: string
        isBluetooth: string
        isCellular: string
        isWifi: string
    }
    es?: {
        name: string
        version: string
    }
    page?: {
        path: string
        referer: string
        search: string
        title: string
        url: string
    }
    screen?: {
        width: number
        height: number
        density: number
    }
    groups?: { [key: string]: string }
    timezone?: string
}

export interface TrackEventRequest {
    context: TrackContext
    eventName: string
    properties?: Map<PropertyName, PropertyValue>
}

export interface TrackPageRequest {
    context: TrackContext
    path: string
    referer: string
    search: string
    title: string
    url: string
    properties?: Map<PropertyName, PropertyValue>
}

export interface TrackClickRequest {
    context: TrackContext
    element: string
    name: string | null
    id: string | null
    class: string | null
    properties?: Map<PropertyName, PropertyValue>
}

export interface IdentifyUserRequest {

}

export interface IdentifyGroupRequest {
    context: TrackContext
    properties?: Map<PropertyName, PropertyValue>
}

export interface UpdateUserRequest {

}

export interface AliasUserRequest {

}

// TODO
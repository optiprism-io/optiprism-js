/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface Context
 */
export interface Context {
    /**
     * 
     * @type {ContextLibrary}
     * @memberof Context
     */
    library?: ContextLibrary;
    /**
     * 
     * @type {ContextPage}
     * @memberof Context
     */
    page?: ContextPage;
    /**
     * 
     * @type {string}
     * @memberof Context
     */
    userAgent?: string;
    /**
     * 
     * @type {string}
     * @memberof Context
     */
    ip?: string;
}
/**
 * 
 * @export
 * @interface ContextLibrary
 */
export interface ContextLibrary {
    /**
     * 
     * @type {string}
     * @memberof ContextLibrary
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ContextLibrary
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ContextPage
 */
export interface ContextPage {
    /**
     * 
     * @type {string}
     * @memberof ContextPage
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof ContextPage
     */
    referrer?: string;
    /**
     * 
     * @type {string}
     * @memberof ContextPage
     */
    search?: string;
    /**
     * 
     * @type {string}
     * @memberof ContextPage
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof ContextPage
     */
    url?: string;
}
/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {ErrorResponseError}
     * @memberof ErrorResponse
     */
    error?: ErrorResponseError;
}
/**
 * 
 * @export
 * @interface ErrorResponseError
 */
export interface ErrorResponseError {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseError
     */
    code?: ErrorResponseErrorCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseError
     */
    message?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ErrorResponseError
     */
    fields?: { [key: string]: string; };
}


/**
 * @export
 */
export const ErrorResponseErrorCodeEnum = {
    _1000InvalidToken: '1000_invalid_token'
} as const;
export type ErrorResponseErrorCodeEnum = typeof ErrorResponseErrorCodeEnum[keyof typeof ErrorResponseErrorCodeEnum];

/**
 * 
 * @export
 * @interface IdentifyEventRequest
 */
export interface IdentifyEventRequest {
    /**
     * 
     * @type {string}
     * @memberof IdentifyEventRequest
     */
    timestamp?: string;
    /**
     * 
     * @type {Context}
     * @memberof IdentifyEventRequest
     */
    context?: Context;
    /**
     * Group
     * @type {string}
     * @memberof IdentifyEventRequest
     */
    group?: string;
    /**
     * Group record id
     * @type {string}
     * @memberof IdentifyEventRequest
     */
    id?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof IdentifyEventRequest
     */
    properties?: { [key: string]: any; };
}
/**
 * 
 * @export
 * @interface TrackEventRequest
 */
export interface TrackEventRequest {
    /**
     * User ID
     * @type {string}
     * @memberof TrackEventRequest
     */
    userId?: string;
    /**
     * Anonymous ID
     * @type {string}
     * @memberof TrackEventRequest
     */
    anonymousId?: string;
    /**
     * 
     * @type {number}
     * @memberof TrackEventRequest
     */
    timestamp?: number;
    /**
     * 
     * @type {Context}
     * @memberof TrackEventRequest
     */
    context: Context;
    /**
     * Event name
     * @type {string}
     * @memberof TrackEventRequest
     */
    event: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof TrackEventRequest
     */
    properties?: { [key: string]: any; };
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof TrackEventRequest
     */
    groups?: { [key: string]: string; };
}

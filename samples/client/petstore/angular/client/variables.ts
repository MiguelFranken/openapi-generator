import { InjectionToken } from '@angular/core';

export type RequestObserveType = "body" | "response" | "events";

/**
 * @property {boolean} debugging - Whether debugging messages should be shown or not for this request
 * @property {RequestObserveType} observe - Specifies what kind of event will be observed
 * @property {typeof T} responseType - Custom DTO that extends the response DTO for the request
 */
export interface IRequestOptionsWithResponseType<T> {
    debugging?: boolean;
    observe?: RequestObserveType;
    responseType?: new() => T;
}

/**
 * You may want to use this interface instead: {@link IRequestOptionsWithResponseType}
 * @property {boolean} debugging - Whether debugging messages should be shown or not for this request
 * @property {RequestObserveType} observe - Specifies what kind of event will be observed
 */
export interface IRequestOptions {
    debugging?: boolean;
    observe?: RequestObserveType;
}

/**
 * An image that was downloaded from the backend
 */
export type HttpImage = string | ArrayBuffer;

export const BASE_PATH = new InjectionToken<string>('basePath');

export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}

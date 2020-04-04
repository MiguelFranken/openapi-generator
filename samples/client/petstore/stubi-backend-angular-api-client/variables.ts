import { InjectionToken } from '@angular/core';

export type RequestObserveType = "body" | "response" | "events";

export interface IRequestOptionsWithResponseType<T> {
    debugging?: boolean;
    observe?: RequestObserveType;
    responseType?: new() => T;
}

export interface IRequestOptions {
    debugging?: boolean;
    observe?: RequestObserveType;
}

export type HttpImage = string | ArrayBuffer;

export const BASE_PATH = new InjectionToken<string>('basePath');

export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}

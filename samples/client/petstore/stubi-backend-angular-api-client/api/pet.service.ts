/**
 * OpenAPI Petstore
 * This is a sample server Petstore server. For this sample, you can use the api key `special-key` to test the authorization filters.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Logger } from "@upe/logger";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable, throwError, Subject } from 'rxjs';
import { plainToClassFromExist } from "class-transformer";
import { catchError, map, concatMap } from "rxjs/operators";

import { Category } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS, HttpImage, IRequestOptions, IRequestOptionsWithResponseType }          from '../variables';
import { Configuration }                                     from '../configuration';

interface LogRequest {
    url: string;
    params?: HttpParams;
    body?: any;
}

interface BlobOptions {
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    responseType: "json"; // "blob" as "json"
}



/**
  * Everything about your Pets
  
  */
@Injectable({
  providedIn: 'root'
})
export class PetService {

    protected basePath = 'http://petstore.swagger.io/v2';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    private logger: Logger = new Logger({ name: "PetService", flags: ["service"] });

    /**
     * Executed when an HTTP error occurred
     */
    private getErrorCallback(request: LogRequest) {
        return (fullHttpErrorResponse: HttpErrorResponse) => {
            const errorDto = fullHttpErrorResponse.error;
            this.logger.error("Error occurred", {
                request,
                error: errorDto
            });
            return throwError(errorDto);
        };
    }

    /**
    * Transforms asynchronously a blob into an image using the file reader
    */
    private createImageFromBlob(image: Blob): Observable<HttpImage> {
        const reader = new FileReader();
        if (image) {
            reader.readAsDataURL(image);
        }
        const subject = new Subject<string | ArrayBuffer>();
        reader.addEventListener("load", () => {
            subject.next(reader.result);
        }, false);
        return subject.asObservable();
    }

    constructor(
      protected httpClient: HttpClient,
      @Optional()@Inject(BASE_PATH) basePath: string,
      @Optional() configuration: Configuration
    ) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
  * Add a new pet to the store
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "name" : "Hallo Welt",
  "id" : 0
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 202 (Ok) with body {@link Category}<br>- 405 (Invalid input)
  * <p></p>
  * @param requestOptions TODO
  */

    public addPet(requestOptions?: IRequestOptions): Observable<Category>
    /**
  * Add a new pet to the store
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "name" : "Hallo Welt",
  "id" : 0
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 202 (Ok) with body {@link Category}<br>- 405 (Invalid input)
  * <p></p>
  * @param requestOptions TODO
  */

    public addPet<T>(requestOptions?: IRequestOptionsWithResponseType<T>): Observable<T>
    public addPet<T>(requestOptions?: any): Observable<Category> {
        if (!!requestOptions && !!requestOptions.debugging) {
            if (!!requestOptions.responseType) {
                this.logger.debug("Using extended DTO for deserialization");
            } else {
                this.logger.debug("No handwritten DTO extension was registered");
            }
            this.logger.debug("Sending request addPet");
        }


        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/xml',
            'application/json'
        ];
        let httpHeaderAcceptSelected  = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.includes('image')) {
            responseType = "blob" as "json";
        }


        const httpOptions: any = {
            responseType: <any>responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: (!!requestOptions && !!requestOptions.observe) ? requestOptions.observe : "body"
        };

        const requestPath = `${this.configuration.basePath}/pet`;

        const logRequest: LogRequest = {
            url: requestPath,
            body: null
        };

        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.includes('image')) {
            return this.httpClient.get<Blob>(requestPath, httpOptions as BlobOptions).pipe(
                concatMap(result => {
                    return this.createImageFromBlob(result);
                }),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        } else if (!!requestOptions && !!requestOptions.responseType) {
            const responseObservable = this.httpClient.post<any>(requestPath ,null,httpOptions).pipe(
                map(response => plainToClassFromExist(new requestOptions.responseType(), response)),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
            return responseObservable;
        } else {
            return this.httpClient.post<Category>(requestPath, 
            null,
                httpOptions
            ).pipe(
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        }
  }

}

/**
 * Stubi Backend REST Documentation
 * This page contains the documentation of the backend of Stubi.<h2>Repositories</h2><ul><li><a href=\"https://github.com/IT4Kids/stubi\">Stubi Frontend</a></li><li><a href=\"https://github.com/IT4Kids/stubi-backend\">Stubi Backend</a></li></ul><h2>Authentication</h2>Most of the endpoints are not public and need a proper authentication. The following is a list of tokens that can be used for testing purposes in this documentation. It is important that you use the whole token including the string \"Bearer\". Click on \"Authorize\" in the upper right corner and copy one of these tokens to authenticateyourself. All subsequent requests will then be sent together with this token.<h3>Tokens</h3><ul><li style=\"overflow-wrap: break-word;\">Admin Token: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0ODM5NTI5OX0.6M2JFiexb08iNF1D1Mj1MGw0Brqr3Kz7QWbobMW4pDQnjVfgjU7JHZ4Pkba2JINIg0CuiJBYzOfhpyo679CODg</li><li style=\"overflow-wrap: break-word;\">User Token: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjQ4Mzk0ODg0fQ.VkIApvDlHToVDa4CNjHi-I_SZ1HdYOQv3T0-iC-o-O4U3uYqUEYX7ZHOMQH2jATb3Z_Pycqp9K-SBKaB5BpAyw</li></ul>
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
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

import { LogMessageDTO } from '../model/models';
import { OkDTO } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS, HttpImage, IRequestOptions, IRequestOptionsWithResponseType }          from '../variables';
import { Configuration }                                     from '../configuration';

interface LogRequest {
    url: string;
    params?: HttpParams;
    body?: any;
    headers?: HttpHeaders;
}

interface BlobOptions {
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    responseType: "json"; // "blob" as "json"
}


/**
 * @property { Array<LogMessageDTO> } dtos - DTOs logging some data
 */
export interface LogRequestParams {
    /** DTOs logging some data */
    dtos: Array<LogMessageDTO>;
}


/**
  * Endpoints used to monitor the app's and/or user's behavior
  
  */
@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

    protected basePath = 'http://49.12.40.234:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    private logger: Logger = new Logger({ name: "MonitoringService", flags: ["service"] });

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
  * Log the specified message
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "type" : "OkDTO"
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (OK) with body {@link OkDTO}
  * <p></p>
  * @param requestParameters {@link LogRequestParams}
  * @param requestOptions Optional request options
  */

    public log(requestParameters: LogRequestParams, requestOptions?: IRequestOptions): Observable<OkDTO>
    /**
  * Log the specified message
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "type" : "OkDTO"
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (OK) with body {@link OkDTO}
  * <p></p>
  * @param requestParameters {@link LogRequestParams}
  * @param requestOptions Optional request options
  */

    public log<T>(requestParameters: LogRequestParams, requestOptions?: IRequestOptionsWithResponseType<T>): Observable<T>
    public log<T>(requestParameters: LogRequestParams, requestOptions?: any): Observable<OkDTO> {
        if (!!requestOptions && !!requestOptions.debugging) {
            if (!!requestOptions.responseType) {
                this.logger.debug("Using extended DTO for deserialization");
            } else {
                this.logger.debug("No handwritten DTO extension was registered");
            }
            this.logger.debug("Sending request log with parameters", requestParameters);
        }

        const dtos = requestParameters.dtos;
        if (dtos === null || dtos === undefined) {
            this.logger.error('Required parameter dtos was null or undefined when calling log.');
            throw new Error('Required parameter dtos was null or undefined when calling log.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected  = this.configuration.selectHeaderAccept(httpHeaderAccepts);

        let acceptString = "application/json";
        if (httpHeaderAccepts.length > 0) {
            acceptString = httpHeaderAccepts.join(", ");
            if (httpHeaderAccepts.find((acceptString: string) => acceptString.includes("json")) === undefined) {
                acceptString += ", application/json";
            }
        }
        headers = headers.set('Accept', acceptString);

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        if(acceptString.includes('image')) {
            responseType = "blob" as "json";
        }


        const httpOptions: any = {
            responseType: <any>responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: (!!requestOptions && !!requestOptions.observe) ? requestOptions.observe : "body"
        };

        const requestPath = `${this.configuration.basePath}/log`;

        const logRequest: LogRequest = {
            url: requestPath,
            body: dtos,
            headers
        };

        if (acceptString.includes('image')) {
            return this.httpClient.get<Blob>(requestPath, httpOptions as BlobOptions).pipe(
                concatMap(result => {
                    return this.createImageFromBlob(result);
                }),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        } else if (!!requestOptions && !!requestOptions.responseType) {
            const responseObservable = this.httpClient.post<any>(requestPath ,dtos,httpOptions).pipe(
                map(response => plainToClassFromExist(new requestOptions.responseType(), response)),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
            return responseObservable;
        } else {
            return this.httpClient.post<OkDTO>(requestPath, 
            dtos,
                httpOptions
            ).pipe(
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        }
  }

}

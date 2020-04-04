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

import { Order } from '../model/models';

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
 * @property { string } orderId - ID of the order that needs to be deleted
 */
export interface DeleteOrderRequestParams {
    /** ID of the order that needs to be deleted */
    orderId: string;
}

/**
 * @property { number } orderId - ID of pet that needs to be fetched
 */
export interface GetOrderByIdRequestParams {
    /** ID of pet that needs to be fetched */
    orderId: number;
}

/**
 * @property { Order } body - order placed for purchasing the pet
 */
export interface PlaceOrderRequestParams {
    /** order placed for purchasing the pet */
    body: Order;
}


/**
  * Access to Petstore orders
  
  */
@Injectable({
  providedIn: 'root'
})
export class StoreService {

    protected basePath = 'http://petstore.swagger.io/v2';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    private logger: Logger = new Logger({ name: "StoreService", flags: ["service"] });

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
  * Delete purchase order by ID
  * <p></p>
  * <p></p>
  * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 400 (Invalid ID supplied)<br>- 404 (Order not found)
  * <p></p>
  * @param requestParameters {@link DeleteOrderRequestParams}
  * @param requestOptions Optional request options
  */

    public deleteOrder(requestParameters: DeleteOrderRequestParams, requestOptions?: IRequestOptions): Observable<any>
    /**
  * Delete purchase order by ID
  * <p></p>
  * <p></p>
  * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 400 (Invalid ID supplied)<br>- 404 (Order not found)
  * <p></p>
  * @param requestParameters {@link DeleteOrderRequestParams}
  * @param requestOptions Optional request options
  */

    public deleteOrder<T>(requestParameters: DeleteOrderRequestParams, requestOptions?: IRequestOptionsWithResponseType<T>): Observable<T>
    public deleteOrder<T>(requestParameters: DeleteOrderRequestParams, requestOptions?: any): Observable<any> {
        if (!!requestOptions && !!requestOptions.debugging) {
            if (!!requestOptions.responseType) {
                this.logger.debug("Using extended DTO for deserialization");
            } else {
                this.logger.debug("No handwritten DTO extension was registered");
            }
            this.logger.debug("Sending request deleteOrder with parameters", requestParameters);
        }

        const orderId = requestParameters.orderId;
        if (orderId === null || orderId === undefined) {
            this.logger.error('Required parameter orderId was null or undefined when calling deleteOrder.');
            throw new Error('Required parameter orderId was null or undefined when calling deleteOrder.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
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

        const requestPath = `${this.configuration.basePath}/store/order/${encodeURIComponent(String(orderId))}`;

        const logRequest: LogRequest = {
            url: requestPath,
            
        };

        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.includes('image')) {
            return this.httpClient.get<Blob>(requestPath, httpOptions as BlobOptions).pipe(
                concatMap(result => {
                    return this.createImageFromBlob(result);
                }),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        } else if (!!requestOptions && !!requestOptions.responseType) {
            const responseObservable = this.httpClient.delete<any>(requestPath ,httpOptions).pipe(
                map(response => plainToClassFromExist(new requestOptions.responseType(), response)),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
            return responseObservable;
        } else {
            return this.httpClient.delete<any>(requestPath, 
                httpOptions
            ).pipe(
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        }
  }

    /**
  * Returns pet inventories by status
  * <p></p>
  * <p></p>
  * Returns a map of status codes to quantities
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (successful operation)
  * <p></p>
  * @param requestOptions Optional request options
  */

    public getInventory(requestOptions?: IRequestOptions): Observable<{ [key: string]: number; }>
    /**
  * Returns pet inventories by status
  * <p></p>
  * <p></p>
  * Returns a map of status codes to quantities
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (successful operation)
  * <p></p>
  * @param requestOptions Optional request options
  */

    public getInventory<T>(requestOptions?: IRequestOptionsWithResponseType<T>): Observable<T>
    public getInventory<T>(requestOptions?: any): Observable<{ [key: string]: number; }> {
        if (!!requestOptions && !!requestOptions.debugging) {
            if (!!requestOptions.responseType) {
                this.logger.debug("Using extended DTO for deserialization");
            } else {
                this.logger.debug("No handwritten DTO extension was registered");
            }
            this.logger.debug("Sending request getInventory");
        }


        let headers = this.defaultHeaders;

        // authentication (api_key) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["api_key"] || this.configuration.apiKeys["api_key"];
            if (key) {
                headers = headers.set('api_key', key);
            }
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
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

        const requestPath = `${this.configuration.basePath}/store/inventory`;

        const logRequest: LogRequest = {
            url: requestPath,
            
        };

        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.includes('image')) {
            return this.httpClient.get<Blob>(requestPath, httpOptions as BlobOptions).pipe(
                concatMap(result => {
                    return this.createImageFromBlob(result);
                }),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        } else if (!!requestOptions && !!requestOptions.responseType) {
            const responseObservable = this.httpClient.get<any>(requestPath ,httpOptions).pipe(
                map(response => plainToClassFromExist(new requestOptions.responseType(), response)),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
            return responseObservable;
        } else {
            return this.httpClient.get<{ [key: string]: number; }>(requestPath, 
                httpOptions
            ).pipe(
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        }
  }

    /**
  * Find purchase order by ID
  * <p></p>
  * <p></p>
  * For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "petId" : 6,
  "quantity" : 1,
  "id" : 0,
  "shipDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "status" : "placed"
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (successful operation) with body {@link Order}<br>- 400 (Invalid ID supplied)<br>- 404 (Order not found)
  * <p></p>
  * @param requestParameters {@link GetOrderByIdRequestParams}
  * @param requestOptions Optional request options
  */

    public getOrderById(requestParameters: GetOrderByIdRequestParams, requestOptions?: IRequestOptions): Observable<Order>
    /**
  * Find purchase order by ID
  * <p></p>
  * <p></p>
  * For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "petId" : 6,
  "quantity" : 1,
  "id" : 0,
  "shipDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "status" : "placed"
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (successful operation) with body {@link Order}<br>- 400 (Invalid ID supplied)<br>- 404 (Order not found)
  * <p></p>
  * @param requestParameters {@link GetOrderByIdRequestParams}
  * @param requestOptions Optional request options
  */

    public getOrderById<T>(requestParameters: GetOrderByIdRequestParams, requestOptions?: IRequestOptionsWithResponseType<T>): Observable<T>
    public getOrderById<T>(requestParameters: GetOrderByIdRequestParams, requestOptions?: any): Observable<Order> {
        if (!!requestOptions && !!requestOptions.debugging) {
            if (!!requestOptions.responseType) {
                this.logger.debug("Using extended DTO for deserialization");
            } else {
                this.logger.debug("No handwritten DTO extension was registered");
            }
            this.logger.debug("Sending request getOrderById with parameters", requestParameters);
        }

        const orderId = requestParameters.orderId;
        if (orderId === null || orderId === undefined) {
            this.logger.error('Required parameter orderId was null or undefined when calling getOrderById.');
            throw new Error('Required parameter orderId was null or undefined when calling getOrderById.');
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

        const requestPath = `${this.configuration.basePath}/store/order/${encodeURIComponent(String(orderId))}`;

        const logRequest: LogRequest = {
            url: requestPath,
            
        };

        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.includes('image')) {
            return this.httpClient.get<Blob>(requestPath, httpOptions as BlobOptions).pipe(
                concatMap(result => {
                    return this.createImageFromBlob(result);
                }),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        } else if (!!requestOptions && !!requestOptions.responseType) {
            const responseObservable = this.httpClient.get<any>(requestPath ,httpOptions).pipe(
                map(response => plainToClassFromExist(new requestOptions.responseType(), response)),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
            return responseObservable;
        } else {
            return this.httpClient.get<Order>(requestPath, 
                httpOptions
            ).pipe(
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        }
  }

    /**
  * Place an order for a pet
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "petId" : 6,
  "quantity" : 1,
  "id" : 0,
  "shipDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "status" : "placed"
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (successful operation) with body {@link Order}<br>- 400 (Invalid Order)
  * <p></p>
  * @param requestParameters {@link PlaceOrderRequestParams}
  * @param requestOptions Optional request options
  */

    public placeOrder(requestParameters: PlaceOrderRequestParams, requestOptions?: IRequestOptions): Observable<Order>
    /**
  * Place an order for a pet
  * <p></p>
  * <p></p>
  * <b>Example Response:</b><br>
  * <pre>
  * {
  "petId" : 6,
  "quantity" : 1,
  "id" : 0,
  "shipDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "status" : "placed"
}
  * </pre>
  * <p></p>
  * <p><b>Possible HTTP Response Statuses:</b>
  * <br>- 200 (successful operation) with body {@link Order}<br>- 400 (Invalid Order)
  * <p></p>
  * @param requestParameters {@link PlaceOrderRequestParams}
  * @param requestOptions Optional request options
  */

    public placeOrder<T>(requestParameters: PlaceOrderRequestParams, requestOptions?: IRequestOptionsWithResponseType<T>): Observable<T>
    public placeOrder<T>(requestParameters: PlaceOrderRequestParams, requestOptions?: any): Observable<Order> {
        if (!!requestOptions && !!requestOptions.debugging) {
            if (!!requestOptions.responseType) {
                this.logger.debug("Using extended DTO for deserialization");
            } else {
                this.logger.debug("No handwritten DTO extension was registered");
            }
            this.logger.debug("Sending request placeOrder with parameters", requestParameters);
        }

        const body = requestParameters.body;
        if (body === null || body === undefined) {
            this.logger.error('Required parameter body was null or undefined when calling placeOrder.');
            throw new Error('Required parameter body was null or undefined when calling placeOrder.');
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

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
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

        const requestPath = `${this.configuration.basePath}/store/order`;

        const logRequest: LogRequest = {
            url: requestPath,
            body: body
        };

        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.includes('image')) {
            return this.httpClient.get<Blob>(requestPath, httpOptions as BlobOptions).pipe(
                concatMap(result => {
                    return this.createImageFromBlob(result);
                }),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        } else if (!!requestOptions && !!requestOptions.responseType) {
            const responseObservable = this.httpClient.post<any>(requestPath ,body,httpOptions).pipe(
                map(response => plainToClassFromExist(new requestOptions.responseType(), response)),
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
            return responseObservable;
        } else {
            return this.httpClient.post<Order>(requestPath, 
            body,
                httpOptions
            ).pipe(
                catchError(this.getErrorCallback(logRequest).bind(this))
            );
        }
  }

}

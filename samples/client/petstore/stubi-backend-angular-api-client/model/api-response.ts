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
import { Type } from "class-transformer";


/**
 * Describes the result of uploading an image resource
 * <p></p>
 * <p></p>
 * <b>Example Model:</b><br>
 * <pre>
 * {
  "code" : 0,
  "type" : "type",
  "message" : "message"
}
 * </pre>
 */
// @dynamic
export class ApiResponse { 
    /**
     
     * <p>Example: 0</p>
     */
    
    
    
    code?: number;
    /**
     
     * <p>Example: "type"</p>
     */
    
    
    
    type?: string;
    /**
     
     * <p>Example: "message"</p>
     */
    
    
    
    message?: string;
}


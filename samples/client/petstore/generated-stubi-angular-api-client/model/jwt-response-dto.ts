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
import { Type } from "class-transformer";


/**
 * Provides the token after successful authentication
 * <p></p>
 * <p></p>
 * <b>Example Model:</b><br>
 * <pre>
 * {
  "firstname" : "Miguel",
  "id" : 0,
  "lastname" : "Franken",
  "refreshToken" : "refreshToken",
  "token" : "token",
  "username" : "miguel.franken"
}
 * </pre>
 */
// @dynamic
export class JwtResponseDTO { 
    /**
     * First name of the user account that was authenticated
     * <p>Example: Miguel</p>
     */
    
    
    
    firstname: string;
    /**
     * Database generated id of the user account that was authenticated
     * <p>Example: 0</p>
     */
    
    
    
    id: number;
    /**
     * Last name of the user account that was authenticated
     * <p>Example: Franken</p>
     */
    
    
    
    lastname: string;
    /**
     * Token uniquely associated with a user account used to refresh the user token
     * <p>Example: "refreshToken"</p>
     */
    
    
    
    refreshToken: string;
    /**
     * Authentication token with which users authenticate themselves
     * <p>Example: "token"</p>
     */
    
    
    
    token: string;
    /**
     * Unique username of the user account that solely belongs the registration code
     * <p>Example: miguel.franken</p>
     */
    
    
    
    username: string;
}


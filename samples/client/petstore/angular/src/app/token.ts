import * as jwt_decode from 'jwt-decode';
import { JwtResponseDTO } from "@generatedclient/model/jwt-response-dto";

export type Role = 'ROLE_ADMIN' | 'ROLE_USER';
export type Privilege = string;

export interface Authority {
  authority: string;
}

export class Token {

  public static hasRole(role: Role): boolean {
    if (Token.isPresentToken()) {
      const authorities = Token.getAuthorities();
      return !!authorities.find((authority) => authority.authority === role);
    } else {
      return false;
    }
  }

  public static hasPrivilege(privilege: Privilege): boolean {
    const authorities = Token.getAuthorities();
    return !!authorities.find((authority) => authority.authority === privilege);
  }

  public static isAdmin(): boolean {
    return Token.hasRole('ROLE_ADMIN');
  }

  public static getToken(): string {
    console.log("Trying to get token");
    if (!Token.isPresentToken()) {
      const errorMessage = 'Cannot get token as token is not present';
      throw new Error(errorMessage);
    } else {
      return sessionStorage.getItem('token');
    }
  }

  public static isPresentToken(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null;
  }

  private static getAuthorities(): Authority[] {
    const token = sessionStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded.roles;
  }

  public static setToken(jwtResponseDTO: JwtResponseDTO) {
    sessionStorage.setItem('refreshToken', jwtResponseDTO.refreshToken);
    sessionStorage.setItem('username', jwtResponseDTO.username);
    sessionStorage.setItem('token', jwtResponseDTO.token);
  }

}

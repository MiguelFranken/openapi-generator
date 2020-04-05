import { Token } from './token';
import { BehaviorSubject } from "rxjs";
import { Configuration, ConfigurationParameters } from "../../client";

export function apiConfigFactory(): BehaviorSubject<Configuration> {
  const params: ConfigurationParameters = {
    apiKeys:
      Token.isPresentToken() ? {
        Authorization: `Bearer ${Token.getToken()}`
      } : {}
  };
  return new BehaviorSubject<Configuration>(new Configuration(params));
}

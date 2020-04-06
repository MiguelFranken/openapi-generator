import { Token } from './token';
import { Configuration, ConfigurationParameters } from "@generatedclient/configuration";

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    apiKeys:
      () => Token.isPresentToken() ? {
        Authorization: `Bearer ${Token.getToken()}`
      } : {}
  };
  return new Configuration(params);
}

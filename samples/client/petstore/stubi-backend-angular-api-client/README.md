## Stubi Backend Angular API Client

### NPM Configuration
Add `@it4kids:registry=https://npm.pkg.github.com` to `~/.npmrc`

### Install
```
npm install @miguelfranken/stubi-backend-angular-client@0.0.1-SNAPSHOT.202004041419 --save
```

### General usage

```typescript
// without configuring providers
import { ApiModule } from '@miguelfranken/stubi-backend-angular-client';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        ApiModule,
        // make sure to import the HttpClientModule in the AppModule only,
        // see https://github.com/angular/angular/issues/20575
        HttpClientModule
    ],
    declarations: [ AppComponent ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
```

```typescript
// configuring providers
import { ApiModule, Configuration, ConfigurationParameters } from '@miguelfranken/stubi-backend-angular-client';

export function apiConfigFactory (): Configuration => {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
    imports: [ ApiModule.forRoot(apiConfigFactory) ],
    declarations: [ AppComponent ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
```

```typescript
import { DefaultApi } from '@miguelfranken/stubi-backend-angular-client';

export class AppComponent {
	 constructor(private apiGateway: DefaultApi) { }
}
```

Note: The ApiModule is restricted to being instantiated once app wide.
This is to ensure that all services are treated as singletons.

### Set service base path
If different than the generated base path, during app bootstrap, you can provide the base path to your service. 

```typescript
import { BASE_PATH } from '@miguelfranken/stubi-backend-angular-client';

bootstrap(AppComponent, [
    { provide: BASE_PATH, useValue: 'https://your-web-service.com' },
]);
```
or

```typescript
import { BASE_PATH } from '@miguelfranken/stubi-backend-angular-client';

@NgModule({
    imports: [],
    declarations: [ AppComponent ],
    providers: [ provide: BASE_PATH, useValue: 'https://your-web-service.com' ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
```

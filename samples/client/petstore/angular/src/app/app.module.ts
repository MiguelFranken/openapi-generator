import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { apiConfigFactory } from './api.config';
import { BASE_PATH } from "@generatedclient/variables";
import { ApiModule } from "@generatedclient/api.module";
import { BlobErrorHttpInterceptor } from "../../blob-error-http.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule
  ],
  providers: [
    {
      provide: BASE_PATH,
      // useValue: 'http://49.12.40.234:8080'
      useValue: 'http://localhost:8080'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BlobErrorHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

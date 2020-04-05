import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { apiConfigFactory } from './api.config';
import { BASE_PATH } from "@generatedclient/variables";
import { ApiModule } from "@generatedclient/api.module";

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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

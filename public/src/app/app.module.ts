import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TripService} from "./services/trip.service";
import {HttpClientModule} from "@angular/common/http";
import {LocationService} from "./services/location.service";
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {AuthService} from "./services/auth.service";
import { AlertModule } from 'ngx-alerts';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 3000}),
    HttpClientModule
  ],
  providers: [
    TripService,
    LocationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

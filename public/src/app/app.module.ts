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
import {AlertsModule, AlertsService} from "angular-alert-module";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertsModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    TripService,
    LocationService,
    AuthService,
    AlertsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

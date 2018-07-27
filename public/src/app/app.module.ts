import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TripService} from "./services/trip.service";
import {HttpClientModule} from "@angular/common/http";
import {LocationService} from "./services/location.service";
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';

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
    HttpClientModule
  ],
  providers: [
    TripService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

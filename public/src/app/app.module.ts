import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TripService} from "./services/trip.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TripService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

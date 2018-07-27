import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class TripService {
  tripUrl = environment.tripUrl;

  constructor(private http: HttpClient) { }

  createTrip(userId, name, locations) {
    return this.http.post(this.tripUrl + '/create', {userID: userId, name: name, locations: locations});
  }

  getTrips(userId){
    return this.http.post(this.tripUrl + '/get/userId', {userId: userId});
  }

}

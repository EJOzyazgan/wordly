import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class LocationService {
  locationUrl = environment.locationUrl;

  constructor(private http: HttpClient) { }

  getLocations(tripId){
    return this.http.post(this.locationUrl + '/get/tripId', {tripID: tripId});
  }

  getLocation(locationId){
    return this.http.post(this.locationUrl + '/get/location', {locationID: locationId});
  }

  getPosts(locationId){
    return this.http.post(this.locationUrl + '/get/posts', {locationID: locationId});
  }

  createPost(locationId, text, picture){
    return this.http.post(this.locationUrl + '/post/create', {locationID: locationId, text: text, picture: picture});
  }

  deletePost(postId){
    return this.http.post(this.locationUrl + '/post/delete', {postID: postId});
  }

  deleteLocation(locationId){
    return this.http.post(this.locationUrl + '/delete', {locationID: locationId});
  }

}

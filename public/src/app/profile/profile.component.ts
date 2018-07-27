import { Component, OnInit } from '@angular/core';
import {Trip} from "../models/trip";
import {Location} from "../models/location";
import {TripService} from "../services/trip.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  trips;
  currentTrip = new Trip(null);

  newTripName = "";
  newTripLocations = [];
  newTripLocationName = "";
  createNewTrip = false;
  userId = "1";

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.getTrips();
    console.log(this.trips);
  }

  getTrips(){
    this.tripService.getTrips(this.userId).subscribe((trips) => {
      this.trips = trips;
    })
  }

  toggleCreateTrip(){
    this.createNewTrip = !this.createNewTrip;
  }

  isCurrentTrip(trip){
    return this.currentTrip.id === trip.id;
  }

  setTrip(trip){
    this.currentTrip = trip;
  }

  openLocation(location){
    console.log(location);
  }

  createTrip(){
    if(this.newTripName !== "" && this.newTripLocations !== []){
      this.tripService.createTrip(this.userId, this.newTripName, this.newTripLocations).subscribe((trip) =>{
        console.log(trip);
      });

    }
  }

  addLocation(){
    if(this.newTripLocationName.trim() !== ""){
      this.newTripLocations.push(this.newTripLocationName);
      this.newTripLocationName = "";
    }
    console.log(this.newTripLocations);
  }
}

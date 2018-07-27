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
  trips = [];
  currentTrip = new Trip(null);

  newTripName = "";
  newTripLocations = [];
  newTripLocationName = "";
  createNewTrip = false;
  userId = "1";

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.trips = [new Trip("1", "1","Trip1",[new Location("1",  "1","Loc1",["Pic1"])]),
      new Trip("2",  "1","Trip2",[new Location("1", "2","Loc1",["Pic1"])])];
    console.log(this.trips);
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
      this.tripService.createTrip(this.userId, this.newTripName, this.newTripLocations);

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

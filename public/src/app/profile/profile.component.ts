import {Component, OnInit} from '@angular/core';
import {Trip} from "../models/trip";
import {Location} from "../models/location";
import {TripService} from "../services/trip.service";
import {LocationService} from "../services/location.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  trips;
  locations;
  currentTrip = new Trip(null);

  newTripName = "";
  newTripLocations = [];
  newTripLocationName = "";
  createNewTrip = false;
  userId = "1";

  constructor(private tripService: TripService,
              private locationService: LocationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.tripService.getTrips(this.userId).subscribe((trips) => {
      this.trips = trips;
    });
  }

  getLocations(trip) {
    this.locationService.getLocations(trip._id).subscribe((locations) => {
      this.locations = locations
    });
  }

  toggleCreateTrip() {
    this.createNewTrip = !this.createNewTrip;
  }

  isCurrentTrip(trip) {
    return this.currentTrip._id === trip._id;
  }

  setTrip(trip) {
    this.currentTrip = trip;
    this.getLocations(trip);
  }

  openLocation(location) {
    localStorage.setItem('locationID', location._id);
    return this.router.navigate(['/location']);
  }

  createTrip() {
    if (this.newTripName !== "" && this.newTripLocations !== []) {
      this.tripService.createTrip(this.userId, this.newTripName, this.newTripLocations).subscribe((trip) => {
        this.getTrips();
      });

    }
  }

  addLocation() {
    if (this.newTripLocationName.trim() !== "") {
      this.newTripLocations.push(this.newTripLocationName);
      this.newTripLocationName = "";
    }
    console.log(this.newTripLocations);
  }
}

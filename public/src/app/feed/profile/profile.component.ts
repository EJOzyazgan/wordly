import {Component, OnInit} from '@angular/core';
import {Trip} from "../../models/trip";
import {TripService} from "../../services/trip.service";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AlertService} from "ngx-alerts";

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
  user;

  newLocName = "";
  newLocation = false;

  constructor(private tripService: TripService,
              private locationService: LocationService,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.authService.getUser(localStorage.getItem('userId')).subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.getTrips();
    })
  }

  getTrips() {
    this.tripService.getTrips(this.user._id).subscribe((trips) => {
      this.trips = trips;
    });
  }

  getLocations(trip) {
    this.locationService.getLocations(trip._id).subscribe((locations) => {
      this.locations = locations
    });
  }

  addNewLocation(trip) {
    if(this.newLocName !== ""){
      this.locationService.createLocation(trip._id, this.newLocName).subscribe((locations) => {
        this.getLocations(trip);
      });
    }
  }

  toggleCreateTrip() {
    this.createNewTrip = !this.createNewTrip;
  }

  toggleCreateLoc() {
    this.newLocation = !this.newLocation;
  }

  isCurrentTrip(trip) {
    return this.currentTrip._id === trip._id;
  }

  setTrip(trip) {
    if(this.currentTrip === trip){
      this.currentTrip = new Trip(null);
    } else {
      this.currentTrip = trip;
      this.getLocations(trip);
    }
  }

  openLocation(location) {
    localStorage.setItem('locationID', location._id);
    return this.router.navigate(['/feed/location']);
  }

  createTrip() {
    if (this.newTripName !== "" && this.newTripLocations !== []) {
      this.tripService.createTrip(this.user._id, this.newTripName, this.newTripLocations).subscribe((trip) => {
        this.getTrips();
        this.alertService.success("Trip Created")
      });
    }
    this.newTripName = "";
    this.newTripLocations = [];
    this.newTripLocationName = "";
    this.createNewTrip = false;
  }

  deleteTrip(trip){
    console.log(trip);
    this.tripService.deleteTrip(trip._id).subscribe((trip) => {
      this.alertService.success("Trip Deleted");
      this.getTrips();
    });
  }

  addLocation() {
    if (this.newTripLocationName.trim() !== "") {
      this.newTripLocations.push(this.newTripLocationName);
      this.newTripLocationName = "";
    }
    console.log(this.newTripLocations);
  }
}

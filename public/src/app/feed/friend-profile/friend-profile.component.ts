import {Component, OnInit} from '@angular/core';
import {Trip} from "../../models/trip";
import {TripService} from "../../services/trip.service";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AlertService} from "ngx-alerts";
import {User} from "../../models/user";

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {
  trips;
  locations;
  currentTrip = new Trip(null);

  user = new User(null);

  constructor(private tripService: TripService,
              private locationService: LocationService,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.authService.getUser(localStorage.getItem('friendId')).subscribe((user) => {
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
    return this.router.navigate(['/feed/location/friend']);
  }
}

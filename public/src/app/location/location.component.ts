import { Component, OnInit } from '@angular/core';
import {LocationService} from "../services/location.service";
import {Location} from "../models/location";
import {Post} from "../models/post";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    createNewPost = false;
    newPostText = "";
    newPostPic = "";

    location = new Location(null);
    posts = new Post(null);

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocation(localStorage.getItem('locationID')).subscribe((location)=> {
      this.location = location;
      this.getPosts();
    })
  }

  toggleCreatePost(){
    this.createNewPost = !this.createNewPost;
  }

  getPosts(){
    this.locationService.getPosts(this.location._id).subscribe((posts) => {
      this.posts = posts;
    })
  }

}

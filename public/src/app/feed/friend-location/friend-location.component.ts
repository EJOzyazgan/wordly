import { Component, OnInit } from '@angular/core';
import {Location} from "../../models/location";
import {LocationService} from "../../services/location.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AlertService} from "ngx-alerts";
import {FileUploader} from "ng2-file-upload/ng2-file-upload";

@Component({
  selector: 'app-friend-location',
  templateUrl: './friend-location.component.html',
  styleUrls: ['./friend-location.component.css']
})
export class FriendLocationComponent implements OnInit {

  createNewPost = false;
  newPostText = "";
  newPostPic = "";

  location = new Location(null);
  posts;

  uploader: FileUploader = new FileUploader({url: environment.locationUrl + '/upload', itemAlias: 'photo'});

  constructor(private locationService: LocationService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.locationService.createPost(this.location._id, this.newPostText, response).subscribe((post) => {
        this.getPosts();
        this.alertService.success("Post Created");
      });

      this.createNewPost = false;
      this.newPostText = "";
      this.newPostPic = "";
    };

    this.locationService.getLocation(localStorage.getItem('locationID')).subscribe((location) => {
      this.location = location;
      this.getPosts();
    })
  }

  toggleCreatePost() {
    this.createNewPost = !this.createNewPost;
  }

  getPosts() {
    this.locationService.getPosts(this.location._id).subscribe((posts) => {
      this.posts = posts;
    })
  }

  onFileSelected(event) {
    this.newPostPic = event.target.files[0];
  }

  createPost() {
    if (this.newPostPic !== "" || this.newPostText !== "") {
      this.uploader.uploadAll();
    }
  }

  deletePost(post){
    this.locationService.deletePost(post._id).subscribe((post) => {
      this.alertService.success("Post Deleted");
      this.getPosts();
    })
  }

  deleteLocation(){
    this.locationService.deleteLocation(this.location._id).subscribe((post) => {
      this.alertService.success("Location Deleted");
      return this.router.navigate(["/feed/profile"]);
    })
  }

}

import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {Location} from "../../models/location";
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {environment} from "../../../environments/environment";
import {AlertService} from "ngx-alerts";

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
  posts;

  uploader: FileUploader = new FileUploader({url: environment.locationUrl + '/upload', itemAlias: 'photo'});

  constructor(private locationService: LocationService,
              private alertService: AlertService) {
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
}

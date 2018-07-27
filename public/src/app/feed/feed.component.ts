import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {Post} from "../models/post";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  user = new User(null);

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getUser(localStorage.getItem('userId')).subscribe((user) =>{
      this.user = user;
    });
    return this.router.navigate(['/feed/mainFeed']);
  }

  getUserPic(){
    if(this.user.profile === null || this.user.profile === ""){
      return "../../../../uploads/pics/user.png";
    }else{
      return "../../../../" + this.user.profile;
    }
  }
}

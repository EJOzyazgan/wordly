import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends;
  userSearch = "";
  users;
  currentUser;
  selected = "";

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.getFriends(localStorage.getItem('userId')).subscribe((friends) => {
      this.friends = friends;
    });
    this.authService.getUsers(localStorage.getItem('userId')).subscribe((users) => {
      this.users = users;
    });
  }

  selectedUser(user){
    this.currentUser = user;
    console.log(this.currentUser);
    // this.authService.addFriend(localStorage.getItem('userId'), this.currentUser._id).subscribe((user) => {
    //   console.log(user);
    // })
  }

  getUserPic(friend){
    if(friend.profile === null || friend.profile === ""){
      return "../../../../uploads/pics/user.png";
    }else{
      return "../../../../" + friend.profile;
    }
  }

  seeProfile(friend){
    localStorage.setItem('friendId', friend._id);
    return this.router.navigate(['/feed/profile/friend'])
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  authUrl = environment.authUrl;

  constructor(private http: HttpClient) {
  }

  signUpUser(user) {
    return this.http.post(this.authUrl + '/create', user);
  }

  loginUser(email, password) {
    return this.http.post(this.authUrl + '/login', {email: email, password: password});
  }

  updateUser(user) {
    return this.http.patch(this.authUrl + '/update', user);
  }

  checkExists(email) {
    console.log(this.authUrl);
    return this.http.post(this.authUrl + '/exists', {email: email});
  }

  getUser(id) {
    return this.http.post(this.authUrl + '/get', {userID: id});
  }

  getUsers(id) {
    return this.http.post(this.authUrl + '/get/users',{userID: id});
  }

  getFriends(id) {
    return this.http.post(this.authUrl + '/get/friends', {userID: id});
  }

  addFriend(id, friendId) {
    return this.http.post(this.authUrl + '/add/friend', {userID: id, friendID: friendId});
  }

  getByToken(token) {
    return this.http.post(this.authUrl + '/get/token', {token: token});
  }

  resetPasswordEmail(email) {
    return this.http.post(this.authUrl + '/forgot', {email: email});
  }
}

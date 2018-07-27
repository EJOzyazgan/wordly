import {Component, OnInit} from '@angular/core';
import {AlertsService} from "angular-alert-module";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    user = new User(null);
    disableLogin = false;
    tempPassword = '';
    agreeTos = false;
    show = false;

    constructor(private alertService: AlertsService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.alertService.setDefaults('timeout', 3);
    }

    signup() {
        this.disableLogin = true;
        if (this.user.email !== null && this.user.email !== '' &&
            this.user.password !== null && this.user.password !== '' &&
            this.user.name !== null && this.user.name !== '' &&
            this.tempPassword !== null && this.tempPassword !== '' &&
            this.agreeTos) {


            if (this.user.password !== this.tempPassword) {
                return this.alertService.setMessage("Passwords Do Not Match", 'error');
            } else if (this.user.password.length < 8) {
                return this.alertService.setMessage("Password must be at least 8 characters long", 'error');
            }
          console.log("sighning up");
            this.authService.checkExists(this.user.email).subscribe(user => {
               if(user[0]){
                   return this.alertService.setMessage("User with this email exists", 'error');
               }
              console.log("new user up");
               this.authService.signUpUser(this.user).subscribe(user => {
                   this.alertService.setMessage("Sign Up Successful", 'info');
                   return this.router.navigate(['/auth/login']);
               });
            });

        } else {
            this.disableLogin = false;
            this.alertService.setMessage("Please Fill In All Fields", 'warn');
        }
    }

    showTos() {
        this.show = !this.show;
    }
}

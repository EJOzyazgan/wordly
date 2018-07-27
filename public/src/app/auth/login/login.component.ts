import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertsService} from "angular-alert-module";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user = new User(null);
    disableLogin = false;

    constructor(private alertService: AlertsService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.alertService.setDefaults('timeout', 3);
        localStorage.clear();
    }

    login() {
        this.disableLogin = true;
        if (this.user.email !== null && this.user.email !== '' &&
            this.user.password !== null && this.user.password !== '') {

            this.authService.checkExists(this.user.email).subscribe(users => {
                if (!users[0]) {
                    return this.alertService.setMessage("User does not exist", 'error');
                }

                this.authService.loginUser(this.user.email,this.user.password).subscribe(user => {
                    this.user = user['user'];
                    localStorage.setItem('token', user['token']);
                    localStorage.setItem('userId', user['userId']);
                    return this.router.navigate(['/profile']);
                });
            });
        } else {
            this.disableLogin = false;
            this.alertService.setMessage("Please Fill In All Fields", 'warn');
        }
    }
}

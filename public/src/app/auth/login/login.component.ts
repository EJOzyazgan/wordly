import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "ngx-alerts";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user = new User(null);
    disableLogin = false;

    constructor(private alertService: AlertService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        localStorage.clear();
    }

    login() {
        this.disableLogin = true;
        if (this.user.email !== null && this.user.email !== '' &&
            this.user.password !== null && this.user.password !== '') {

            this.authService.checkExists(this.user.email).subscribe(users => {
                if (!users[0]) {
                    return this.alertService.warning("User does not exist");
                }

                this.authService.loginUser(this.user.email,this.user.password).subscribe(user => {
                    this.user = user['user'];
                    localStorage.setItem('token', user['token']);
                    localStorage.setItem('userId', user['userId']);
                    return this.router.navigate(['/feed']);
                });
            });
        } else {
            this.disableLogin = false;
            this.alertService.warning("Please Fill In All Fields");
        }
    }
}

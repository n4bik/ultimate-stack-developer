import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../api/login.service';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-architect-login',
    templateUrl: './architect-login.component.html'
})
export class ArchitectLoginComponent implements OnInit {
    architectLoginForm: FormGroup;
    invalidCredentialsMessage: string;

    constructor(private router: Router,
                private login: LoginService,
                private cookieService: CookieService) {
    }

    ngOnInit(): void {
        this.setupArchitectLoginForm();
    }

    runLogin() {
        this.loginAndAddTokenToCookies();
    }

    private navigateToArchitectDashboard() {
        this.router.navigateByUrl('/the/architect/dashboard');
    }

    private setupArchitectLoginForm() {
        this.architectLoginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    private loginAndAddTokenToCookies() {
        this.login
            .generateToken(
                this.architectLoginForm.controls.username.value,
                this.architectLoginForm.controls.password.value)
            .toPromise()
            .then((response: any) => {
                this.cookieService.set('token', response.token);
                this.navigateToArchitectDashboard();
            })
            .catch((response) => {
                this.invalidCredentialsMessage = response.error;
                document.getElementById('invalid-credentials-message');
            });
    }
}

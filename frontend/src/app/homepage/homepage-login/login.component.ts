import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../api/login.service';
import {CookieService} from 'ngx-cookie-service';
import {DataPreloaderService} from '../../common/data-preloader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private login: LoginService,
              private cookieService: CookieService,
              private dataPreLoaderService: DataPreloaderService) {
  }

  ngOnInit(): void {
  }

  async loginAndAddTokenToCookies() {
    await this.login
        .generateToken('tbuga', '4dm1n?!')
        .toPromise()
        .then((response: any) => {
          this.cookieService.set('token', response.token);
        });
    await this.dataPreLoaderService.loadData();
    this.router.navigateByUrl('/categories');
  }
}

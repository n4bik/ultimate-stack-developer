import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private cookieService: CookieService) {
    }

    public isTokenValid() {
        const tokenCookie = this.cookieService.get('token');
        const tokenExpectedCharCount = 179;

        return (tokenCookie !== '' &&
            tokenCookie.length === tokenExpectedCharCount &&
            typeof tokenCookie !== undefined);
    }
}

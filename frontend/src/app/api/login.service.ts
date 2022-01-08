import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    // for prod server use: private httpPrefix = 'https://';
    // for dev server use: private httpPrefix = 'http://';
    private httpPrefix = 'http://';

    // for production server use: private backendUrl = 'ultimatestackdeveloper.herokuapp.com';
    // for local server use: private backendUrl = 'localhost:8082';
    private backendUrl = 'localhost:8082';

    constructor(private httpClient: HttpClient) {
    }

    public generateToken(username: string, password: string) {
        const headerDictionary = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDictionary),
        };

        return this.httpClient
            .post(
                `${this.httpPrefix}${this.backendUrl}/login`,
                `{"username":"${username}","password":"${password}"}`,
                requestOptions);
    }
}

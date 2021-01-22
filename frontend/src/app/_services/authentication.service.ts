import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) {}

  apiURL: any = 'http://localhost:3100/api/v1/';

  login(username: string, password: string) {
    return this._http.post(this.apiURL + 'user/login', { 
    	userData: {
    		username: username,
  			password: password
    	}
    })
  }

}

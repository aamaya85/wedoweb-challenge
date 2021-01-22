import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private _http: HttpClient) { }

  apiURL: any = 'http://localhost:3100/api/v1/';

  register(userData: any) {
    return this._http.post(this.apiURL + 'user/register', { userData: userData })
  }


}

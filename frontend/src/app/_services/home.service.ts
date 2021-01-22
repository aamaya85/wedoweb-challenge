import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }

  apiURL: any = 'http://localhost:3100/api/v1/';

  getHighestSeenDomains(){
  	return this._http.get(this.apiURL + 'domain/getHighestSeenDomains')
  }

  registerDomain(domainName: string){
  	return this._http.post(this.apiURL + 'domain/register', { urlVisited: domainName })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService, HomeService } from '../../_services/';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
  	private _homeService: HomeService
  ) { }

  domains: any;
  lastDomain: string;

  ngOnInit(){
    this.checkLastDomains();
  }

  visitDomain(domain: string){
    console.log(domain);
    this.lastDomain = domain;
    this._homeService.registerDomain(domain).subscribe((response) => {
      this.checkLastDomains();
    })
  }

  checkLastDomains(){

    this._homeService.getHighestSeenDomains().subscribe((response) => {
      this.domains = null || response
    })

  }

}

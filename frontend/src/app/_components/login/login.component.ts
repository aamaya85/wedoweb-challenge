import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AuthenticationService, HomeService } from '../../_services/';
import { User } from '../../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/';
  }

	// convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
        	if (data.records > 0 ) {
        		this.router.navigate(['home']);
        	}
        	this.submitted = false;
        	this.loading = false;
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

}

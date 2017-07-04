import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errLogin = '';

  constructor(private authService: AuthService, private router: Router) { }

  submitLogin(email:string, password:string): boolean {
  	this.authService.login(email, password)
  		.subscribe(
        token => {
          this.getProfile();
        },
        error => {
          let arrErrors = JSON.parse(error);
          this.errLogin = arrErrors.error;
        }
      )
  	return false;
  }

  getProfile():void {
    this.authService.fetchProfile()
      .subscribe(
        res => {
          // this could be anything, 
          // in this sample login app, let's just redirect to homepage
          this.router.navigateByUrl("home");
        },
        error => {
          let arrErrors = JSON.parse(error);
          this.errLogin = arrErrors.error;
        }
      )
  }

  ngOnInit() {
  }

}

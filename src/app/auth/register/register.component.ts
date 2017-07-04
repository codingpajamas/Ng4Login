import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  errRegister:any = {
  	'email':'',
  	'first_name':'',
  	'last_name':'',
  	'password':''
  };
 
  submitRegister(email:string, password:string, confirm:string, firstname:string, lastname:string):boolean {
  	console.log(email, password, confirm, firstname, lastname);

  	this.authService.register(email, password, confirm, firstname, lastname)
  		.subscribe(
  			token => {
  				this.getProfile();
  			},
  			error => {
				let arrErrors = JSON.parse(error);  
				
				// setup error messages
				if(arrErrors && arrErrors.errors){
					this.errRegister.email = arrErrors.errors.email ? arrErrors.errors.email[0] : '';
					this.errRegister.first_name = arrErrors.errors.first_name ? arrErrors.errors.first_name[0] : '';
					this.errRegister.last_name = arrErrors.errors.last_name ? arrErrors.errors.last_name[0] : '';
					this.errRegister.password = arrErrors.errors.password ? arrErrors.errors.password[0] : '';
				}
	        }
  		)
  	return false;
  }

  getProfile():void {
    this.authService.fetchProfile()
      .subscribe(
        res => {
          // this could be anything, 
          // in this sample app, let's just redirect to homepage
          this.router.navigateByUrl("home");
        },
        error => {
          let arrErrors = JSON.parse(error);
          this.errRegister = arrErrors.error;
        }
      )
  }

  ngOnInit() {
  }

}

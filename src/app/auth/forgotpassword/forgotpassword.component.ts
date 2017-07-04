import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  
  errForgotPass:string = '';
  msgForgotPass:string = '';

  constructor(private authService:AuthService, private router:Router) { }

  submitForgotPass(email:string): boolean {
  	this.authService.forgotpass(email)
  		.subscribe(
	        msg => {
	          this.errForgotPass = '';
	          this.msgForgotPass = msg;
	        },
	        error => {
	          let arrErrors = JSON.parse(error);
	          this.errForgotPass = arrErrors.errors.email ? arrErrors.errors.email[0] : '';
	        }
	      )
  	return false;
  }

  ngOnInit() {
  }

}

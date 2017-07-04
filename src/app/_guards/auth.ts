import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router){}

	canActivate() {
		let profile = this.authService.getProfile();

		if(profile)
		{
			return true;
		}
		else
		{
			this.router.navigateByUrl('login');
		}
	}
}
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn = false;

  constructor(private router: Router, private authService:AuthService) {
    this.isLoggedIn = this.authService.getProfile() ? true : false;

    // if user is not loggedin yet, subscribe to "checkLoggedIn$"
    // so we know what menu should be displayed in the navbar
    if(!this.isLoggedIn){ 
      this.authService.checkLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      })
    }
  }

  logout():boolean{
    // just reset everything and redirect to whatever url you want
  	localStorage.removeItem('profile');
  	localStorage.removeItem('token'); 
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');

  	return false;
  }
}

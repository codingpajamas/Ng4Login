import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Headers, Http, RequestOptions, Request, RequestMethod } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
 
  private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
  private baseUrl = 'http://laravelwithdingo.dev/api/';

  // app-wide checking if current user is loggedin, particularly used in checking Navbar Menu
  private isLoggedSource = new Subject<boolean>();
  checkLoggedIn$ = this.isLoggedSource.asObservable();

  constructor(private http: Http) { } 

  // trigger the "isLoggedSource" 
  checkLoggedIn(isLoggedIn: boolean) {
    this.isLoggedSource.next(isLoggedIn);
  }

  login(email:string, password:string):Observable<string> {
    return this.http.post(
        this.baseUrl + 'login',
        JSON.stringify({email:email, password:password}),
        { headers: this.headers }
      )
      .map(response => {
        let res = response.json(); 

        // save token to localstorage
        localStorage.setItem('token', res.token);

        // update "isLoggedSource" by triggering checkLoggedIn method 
        this.checkLoggedIn(true);
      })
      .catch(e => {
        let _err = e._body;
        return Observable.throw(_err);
      })
  }  

  getProfile():any {
    let profile = localStorage.getItem('profile'); 
    return JSON.parse(profile) ? JSON.parse(profile) : null; 
  }

  fetchProfile():Observable<any> {
    // reset headers then set headers 
    this.headers.delete('Authorization'); 
    this.headers.append('Authorization', `Bearer ${localStorage.getItem("token")}`); 

    return this.http.get(
        this.baseUrl + 'profile',
        { headers: this.headers }
      )
      .map(response => {
        // if success, save profile to localstorage
        let res = response.json(); 
        localStorage.setItem('profile', JSON.stringify(res.data));
      })
      .catch(e => {
        let _err = e._body;
        return Observable.throw(_err);
      })
  }

}

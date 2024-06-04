import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from '../modals/roles';

import { Router } from '@angular/router';
import { AuthenticationResponse } from '../modals/AuthenticationResponse';
import { AuthenticationRequest } from '../modals/AuthenticationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
          private router: Router
  ) {
  }     

  authenticate(login:any){
    return this.http.post("http://localhost:8099/StockMnager/api/auth/authenticate", login);
  }


  setAccessToken(authenticationResponse: AuthenticationResponse): void {
    localStorage.setItem('accessToken', JSON.stringify(authenticationResponse));
  }

    register(RegisterRequest:any):Observable<any>{
      return this.http.post("http://localhost:8099/StockMnager/api/auth/register", RegisterRequest);
    }
    
 

    getRoles(): Observable<Roles[]>{
      return this.http.get<Roles[]>("http://localhost:8099/StockMnager/api/roles/names");
      
    }
    
  // TODO
  isUserLoggedAndAccessTokenValid(): boolean {
    if (localStorage.getItem('datauser')) {
      // TODO il faut verifier si le access token est valid
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

} 
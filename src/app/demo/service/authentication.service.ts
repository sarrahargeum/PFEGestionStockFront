import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from '../modals/roles';

import { Router } from '@angular/router';
import { AuthenticationResponse } from '../modals/AuthenticationResponse';
import { AuthenticationRequest } from '../modals/AuthenticationRequest';
import { User } from '../modals/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

private baseUrl = 'http://'+environment.urlBack+':8099/StockMnager/api/auth';

  constructor(private http: HttpClient,
          private router: Router
  ) {
  }     

 

  authenticate(login: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, login);
  }


  setaccesstoken(authenticationResponse: AuthenticationResponse): void {
    localStorage.setItem('accesstoken', JSON.stringify(authenticationResponse));
  }

    register(RegisterRequest:any):Observable<any>{
      return this.http.post(`${this.baseUrl}/register`, RegisterRequest);
    }
    
 

    getRoles(): Observable<Roles[]>{
      return this.http.get<Roles[]>("http://"+environment.urlBack+":8099/StockMnager/api/roles/names");
      
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


 

  setConnectedUser(user: User): void {
    localStorage.setItem('connectedUser', JSON.stringify(user));
  }

 /* getConnectedUser(): User {
    if (localStorage.getItem('connectedUser')) {
      return JSON.parse(localStorage.getItem('connectedUser') as string)
    }
    return null;
  }*/
    getConnectedUser(): User | null {
      const userJson = localStorage.getItem('connectedUser');
      if (userJson) {
          try {
              return JSON.parse(userJson);
          } catch (error) {
              console.error('Error parsing connected user from localStorage:', error);
              // Handle the error or return a default User object
          }
      }
      // Return null or a default User object if the user is not found in localStorage
      return null;
  }
  

} 

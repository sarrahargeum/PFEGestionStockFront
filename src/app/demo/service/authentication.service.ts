import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from '../modals/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }     

  authenticate(login:any){
      return this.http.post("http://localhost:8099/StockMnager/api/auth/authenticate", login);
    }
    register(RegisterRequest:any):Observable<any>{
      return this.http.post("http://localhost:8099/StockMnager/api/auth/register", RegisterRequest);
    }
    
    active(active:any){
      return this.http.put("http://localhost:8099/StockMnager/api/auth/admin/activated", active);
    }

    getRoles(): Observable<Roles[]>{
      return this.http.get<Roles[]>("http://localhost:8099/StockMnager/api/roles/names");
      
    }


} 
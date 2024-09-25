import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modals/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://'+environment.urlBack+':8099/StockMnager/api/user';

  constructor(private http: HttpClient) { }


  getUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }


  updateUser(id: number,user: User) {
    return this.http.put(`${this.baseUrl}/updateUser/${id}`, user);
  }

  deleteUser(id: any){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  retrieveUser(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/retrieve-user/${id}`);
  }

  active(userId: number, activated: boolean){
    return this.http.put('http://'+environment.urlBack+':8099/StockMnager/api/auth/admin/activated',  { id: userId, activated: activated });
  }



}

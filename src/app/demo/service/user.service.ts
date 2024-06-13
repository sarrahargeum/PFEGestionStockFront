import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUser(): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8099/StockMnager/api/user/all");
  }


  updateUser(id: number,user: User) {
    return this.http.put(`http://localhost:8099/StockMnager/api/user/updateUser/${id}`, user);
  }

  deleteUser(id: any){
    return this.http.delete(`http://localhost:8099/StockMnager/api/user/delete/${id}`);
  }

  retrieveUser(id: any): Observable<User> {
    return this.http.get<User>(`http://localhost:8099/StockMnager/api/user/retrieve-user/${id}`);
  }

  active(userId: number, activated: boolean){
    return this.http.put("http://localhost:8099/StockMnager/api/auth/admin/activated",  { id: userId, activated: activated });
  }



}

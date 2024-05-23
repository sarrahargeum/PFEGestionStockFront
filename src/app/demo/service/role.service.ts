import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private http: HttpClient) { }


  findAllRole(){
    return this.http.get("http://localhost:8099/StockMnager/api/roles/all").pipe(
      tap(res=>{
        console.log('res', res);
      })
    );
  }
}

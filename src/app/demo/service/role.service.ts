import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private http: HttpClient) { }


  findAllRole(){
    return this.http.get('http://'+environment.urlBack+':8099/StockMnager/api/roles/all').pipe(
      tap(res=>{
      })
    );
  }
}

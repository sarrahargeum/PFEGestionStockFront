import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Magasin } from '../modals/magasin';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

 
    constructor(private http: HttpClient) { }
  
    private apiUrl = 'http://localhost:8099/StockMnager/api/magasin';
  
  getMagasin(): Observable<Magasin[]>{
    return this.http.get<Magasin[]>(`${this.apiUrl}/all`,);
  }
  

  }  
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
    return this.http.get<Magasin[]>(`${this.apiUrl}/all`);
  }
  
  
  postMagasin(mg: any) {
    return this.http.post(`${this.apiUrl}/addFour`, mg);
  }

  retrieveMagasin(id: any): Observable<Magasin> {
    return this.http.get<Magasin>(`${this.apiUrl}/retrieve-magasin/${id}`);
  }

  updateMagasin(id: number, magasin: Magasin): Observable<Magasin> {
   return this.http.put<Magasin>(`${this.apiUrl}/update/${id}`, magasin);
   }

  deleteMagasin(id: any) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  }  
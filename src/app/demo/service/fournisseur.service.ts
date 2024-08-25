import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../modals/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private baseUrl = 'http://localhost:8099/StockMnager/api/fournisseur';

  constructor(private http: HttpClient) { }



  getFournisseur(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/all`);
  }

  postFournisseur(four: any) {
    return this.http.post(`${this.baseUrl}/addFour`, four);
  }

  retrieveFournisseur(id: any): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.baseUrl}/${id}`);
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
   return this.http.put<Fournisseur>(`${this.baseUrl}/update/${id}`, fournisseur);
   }

  deletefourniseur(id: any) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}

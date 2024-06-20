import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../modals/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient) { }



  getFournisseur(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>("http://localhost:8099/StockMnager/api/fournisseur/all");
  }

  postFournisseur(four: any) {
    return this.http.post("http://localhost:8099/StockMnager/api/fournisseur/addFour", four);
  }

  retrieveFournisseur(id: any): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`http://localhost:8099/StockMnager/api/fournisseur/retrieve-fournisseur/${id}`);
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    const url = `http://localhost:8099/StockMnager/api/fournisseur/update/${id}`;
   return this.http.put<Fournisseur>(url, fournisseur);
   }

  deletefourniseur(id: any) {
    return this.http.delete(`http://localhost:8099/StockMnager/api/fournisseur/delete/${id}`);
  }
}

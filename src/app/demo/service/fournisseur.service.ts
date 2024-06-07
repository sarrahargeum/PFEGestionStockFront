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

  postFournisseur(four: Fournisseur) {
    return this.http.post("http://localhost:8099/StockMnager/api/fournisseur/addFour", four);
  }


  deletefourniseur(id: any) {
    return this.http.delete(`http://localhost:8099/StockMnager/api/fournisseur/delete/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BonEntreFournisseur } from '../modals/BonEntreFournisseur';
import { Observable } from 'rxjs';
import { EtatCommande } from '../modals/EtatCommande';

@Injectable({
  providedIn: 'root'
})
export class BonEntreService {

  private baseUrl = 'http://localhost:8099/api/BonEntreFournisseur';

  constructor(private http: HttpClient) { }

  saveBonEntreFournisseur(bonEntreFournisseur: BonEntreFournisseur): Observable<BonEntreFournisseur> {
    return this.http.post<BonEntreFournisseur>(`${this.baseUrl}/saveBF`, bonEntreFournisseur);
  }

  findByCode(code: string): Observable<BonEntreFournisseur> {
    return this.http.get<BonEntreFournisseur>(`${this.baseUrl}/retreive-code/${code}`);
  }

  findAll(): Observable<BonEntreFournisseur[]> {
    return this.http.get<BonEntreFournisseur[]>(`${this.baseUrl}/allBF`);
  }

  findById(id: number): Observable<BonEntreFournisseur> {
    return this.http.get<BonEntreFournisseur>(`${this.baseUrl}/retreive/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateEtatCommande(id: number, etatCommande: EtatCommande): Observable<BonEntreFournisseur> {
    return this.http.put<BonEntreFournisseur>(`${this.baseUrl}/update/etat/${id}/${etatCommande}`, {});
  }

  updateQuantiteCommande(id: number, idligneEntreeFournisseur: number, quantite: number): Observable<BonEntreFournisseur> {
    return this.http.put<BonEntreFournisseur>(`${this.baseUrl}/quantite/${id}/${idligneEntreeFournisseur}/${quantite}`, {});
  }
}


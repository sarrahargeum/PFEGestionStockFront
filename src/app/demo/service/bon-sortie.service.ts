import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtatCommande } from '../modals/EtatCommande';
import { BonSortieDto } from '../modals/DTO/BonSortieDto';
import { BonSortie } from '../modals/BonSortie';

@Injectable({
  providedIn: 'root'
})
export class BonSortieService {

  private baseUrl = 'http://localhost:8099/StockMnager/api/BonSortie';

  constructor(private http: HttpClient) { }

  saveBonSortie(bonSortieClient: BonSortieDto): Observable<BonSortieDto> {
    return this.http.post<BonSortieDto>(`${this.baseUrl}/saveBS`, bonSortieClient);
  }

  saveBSClient(bonSortieClient: BonSortieDto): Observable<BonSortieDto> {
    return this.http.post<BonSortieDto>(`${this.baseUrl}/saveBSClient`, bonSortieClient);
  }

  findByCode(code: string): Observable<BonSortieDto> {
    return this.http.get<BonSortieDto>(`${this.baseUrl}/retreive-code/${code}`);
  }

  findAll(): Observable<BonSortieDto[]> {
    return this.http.get<BonSortieDto[]>(`${this.baseUrl}/allBS`);
  }

  findById(id: number): Observable<BonSortieDto> {
    return this.http.get<BonSortieDto>(`${this.baseUrl}/retreive/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCmd/${id}`);
  }

  updateEtatCommande(id: number, etatCommande: EtatCommande): Observable<BonSortieDto> {
    return this.http.put<BonSortieDto>(`${this.baseUrl}/update/etat/${id}/${etatCommande}`, {});
  }

  updateQuantiteCommande(id: number, idligneSortie: number, quantite: number): Observable<BonSortieDto> {
    return this.http.put<BonSortieDto>(`${this.baseUrl}/quantite/${id}/${idligneSortie}/${quantite}`, {});
  }

  
  updateArticle(id: number, idLigneCommande: number, idArticle: number): Observable<BonSortieDto> {
    return this.http.put<BonSortieDto>(`${this.baseUrl}/quantite/${id}/${idLigneCommande}/${idArticle}`, {});
  }

  updateClient(idCommande: number, idClient: number): Observable<BonSortieDto>{
    return this.http.put<BonSortieDto>(`${this.baseUrl}/${idCommande}/${idClient}`, {});

  }


 deleteArticle(id: number,idLigneCommande:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/article/${id}/${idLigneCommande}`);
  }

  findAllLignesCommandesClientByCommandeClientId(idCommande:number): Observable<BonSortie[]> {
    return this.http.get<BonSortie[]>(`${this.baseUrl}/commandesclients/lignesCommande/${idCommande}`);
  }
  



  saveBonSortieClient(bonSortie: BonSortieDto): Observable<BonSortieDto> {
    return this.http.post<BonSortieDto>(`${this.baseUrl}/saveBSClient`, bonSortie);
  }


}


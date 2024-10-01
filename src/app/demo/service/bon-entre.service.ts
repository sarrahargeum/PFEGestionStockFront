import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BonEntree} from '../modals/BonEntree';
import { Observable } from 'rxjs';
import { EtatCommande } from '../modals/EtatCommande';
import { BonEntreeDto } from '../modals/DTO/BonEntreeDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonEntreService {

  private baseUrl = 'http://'+environment.urlBack+':8099/StockMnager/api/BonEntree';

  constructor(private http: HttpClient) { }

  saveBonEntreFournisseur(bonEntreFournisseur: BonEntreeDto): Observable<BonEntreeDto> {
    return this.http.post<BonEntreeDto>(`${this.baseUrl}/saveBF`, bonEntreFournisseur);
  }

  findByCode(code: string): Observable<BonEntreeDto> {
    return this.http.get<BonEntreeDto>(`${this.baseUrl}/retreive-code/${code}`);
  }

  findAll(): Observable<BonEntreeDto[]> {
    return this.http.get<BonEntreeDto[]>(`${this.baseUrl}/allBF`);
  }

  findById(id: number): Observable<BonEntreeDto> {
    return this.http.get<BonEntreeDto>(`${this.baseUrl}/retreive/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCmd/${id}`);
  }

  updateEtatCommande(id: number, etatCommande: EtatCommande): Observable<BonEntreeDto> {
    return this.http.put<BonEntreeDto>(`${this.baseUrl}/update/etat/${id}/${etatCommande}`, {});
  }

  updateQuantiteCommande(id: number, idligneEntreeFournisseur: number, quantite: number): Observable<BonEntreeDto> {
    return this.http.put<BonEntreeDto>(`${this.baseUrl}/quantite/${id}/${idligneEntreeFournisseur}/${quantite}`, {});
  }


  updateArticle(id: number, idLigneCommande: number, idArticle: number): Observable<BonEntreeDto> {
    return this.http.put<BonEntreeDto>(`${this.baseUrl}/quantite/${id}/${idLigneCommande}/${idArticle}`, {});
  }
  updateFournisseur(idCommande: number, idFournisseur: number): Observable<BonEntreeDto>{
    return this.http.put<BonEntreeDto>(`${this.baseUrl}/${idCommande}/${idFournisseur}`, {});

  }

 deleteArticle(id: number,idLigneCommande:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/article/${id}/${idLigneCommande}`);
  }

 findAllLignesCommandesFournisseurByCommandeFournisseurId(idCommande:number): Observable<BonEntreeDto[]> {
    return this.http.get<BonEntreeDto[]>(`${this.baseUrl}/lignesCommande/${idCommande}`);
  }
 

 
 
}


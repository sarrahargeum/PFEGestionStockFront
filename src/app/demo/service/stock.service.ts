import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MvtStk } from '../modals/mvtStock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:8099/StockMnager/api/mvtstock';

  constructor(private http: HttpClient) { }

  

  mvtStkArticle(idArticle: number): Observable<MvtStk[]> {
    return this.http.get<MvtStk[]>(`${this.baseUrl}/stockreel/${idArticle}`);
  }
}

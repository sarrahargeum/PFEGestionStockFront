import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MvtStk } from '../modals/mvtStock';
import { Observable } from 'rxjs';
import { MVTStockDto } from '../modals/DTO/MVTStockDto';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:8099/StockMnager/api/mvtstock';

  constructor(private http: HttpClient) { }

  

  mvtStkArticle(idArticle: number): Observable<MVTStockDto[]> {
    return this.http.get<MVTStockDto[]>(`${this.baseUrl}/filter/article/${idArticle}`);
  }
  
  stockReelArticle(idArticle: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/stockreel/${idArticle}`);
  }

}

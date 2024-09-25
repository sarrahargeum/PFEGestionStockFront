import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http: HttpClient) { }


  getClientCount(): Observable<number> {
    return this.http.get<number>('http://'+environment.urlBack+':8099/StockMnager/api/client/count');
  }
  getFournisseurCount(): Observable<number> {
    return this.http.get<number>('http://'+environment.urlBack+':8099/StockMnager/api/fournisseur/count');
  }
  getBonSortieCount(): Observable<number> {
    return this.http.get<number>('http://'+environment.urlBack+':8099/StockMnager/api/BonSortie/count');
  }

  getBonEntreeCount(): Observable<number> {
    return this.http.get<number>('http://'+environment.urlBack+':8099/StockMnager/api/BonEntree/count');
  }


}

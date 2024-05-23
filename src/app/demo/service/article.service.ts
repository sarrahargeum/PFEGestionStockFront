import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../modals/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  host :string = "http://localhost:8099";

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8099/StockMnager/api/article';

  getArticle(): Observable<Article[]>{
    return this.http.get<Article[]>("http://localhost:8099/StockMnager/api/article/all");
    
  }
  
  /*postArticle(art:Article,image : any){
    return this.http.post("http://localhost:8099/StockMnager/api/article/add",art)
  }*/
  ajoutArticle(formData:any): Observable<any> {
    return this.http.post("http://localhost:8099/StockMnager/api/article/add",formData);
  }

  deleteArticle(id: any){
    return this.http.delete(`http://localhost:8099/StockMnager/api/arcile/delete/${id}`);
  }
}
  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../modals/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8099/StockMnager/api/article';

  getArticle(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.baseUrl}/allArticle`);
    
  }
  

  ajoutArticle(formData:any): Observable<any> {

    return this.http.post(`${this.baseUrl}/add`,formData);
  }

  deleteArticle(id: any){
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }


  updateArticle(id: number, article: Article): Observable<Article> {
    const url = `${this.baseUrl}/update/${id}`;
   return this.http.put<Article>(url, article);
   }

   retrieveArticle(id: any): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/retrieve-article/${id}`);
  }

}
  
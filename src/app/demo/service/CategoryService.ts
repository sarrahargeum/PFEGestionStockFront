import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../modals/category';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../modals/AuthenticationResponse';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://'+environment.urlBack+':8099/StockMnager/api/category';
  constructor(private http: HttpClient) { }

  
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all`);
  }

  postCategory(cat: Category) {
    return this.http.post(`${this.baseUrl}/addCat`, cat);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
   const url = `${this.baseUrl}/Update/${id}`;
  return this.http.put<Category>(url, category);
  }
  retrieveCategory(id: any): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/retrieve-category/${id}`);
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  

}

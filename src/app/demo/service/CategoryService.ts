import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../modals/category';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../modals/AuthenticationResponse';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }


  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:8099/StockMnager/api/category/all");
  }

  postCategory(cat: Category) {
    return this.http.post("http://localhost:8099/StockMnager/api/category/addCat", cat);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
   const url = `http://localhost:8099/StockMnager/api/category/Update/${id}`;
  return this.http.put<Category>(url, category);
  }

  retrieveCategory(id: any): Observable<Category> {
    return this.http.get<Category>(`http://localhost:8099/StockMnager/api/category/retrieve-category/${id}`);
  }

  deleteCategory(id: any) {
    return this.http.delete(`http://localhost:8099/StockMnager/api/category/delete/${id}`);
  }

  

}

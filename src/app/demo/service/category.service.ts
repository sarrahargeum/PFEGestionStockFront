import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../modals/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }


getCategory(): Observable<Category[]>{
  return this.http.get<Category[]>("http://localhost:8099/StockMnager/api/category/all");
}

postCategory(cat: Category){
  return this.http.post("http://localhost:8099/StockMnager/api/category/addCat",cat)
}

 updateCategory(cat: any) {
  return this.http.put("http://localhost:8099/StockMnager/api/category/update", cat);
}
retrieveCategory(id: any): Observable<Category> {
  return this.http.get<Category>(`http://localhost:8099/StockMnager/api/user/retrieve-category/${id}`);
}

deleteCategory(id: any){
  return this.http.delete(`http://localhost:8099/StockMnager/api/category/delete/${id}`);
}

}

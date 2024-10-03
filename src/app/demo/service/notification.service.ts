import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://'+environment.urlBack+':8099/StockMnager/api/notifications';

  constructor(private http: HttpClient) {}

  getNotificationsByType(type: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/not`, { params: { type }});   
  }
  markAllAsRead() {
    return this.http.put(`${this.apiUrl}/mark-all-as-read`, {});
  }
 
}
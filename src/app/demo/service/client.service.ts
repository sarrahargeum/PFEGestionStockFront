import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../modals/Client';
import { Observable } from 'rxjs';
import { ClientDto } from '../modals/DTO/ClientDto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8099/StockMnager/api/client';

  constructor(private http: HttpClient) { }



  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/all`);
  }

  saveClient(clientData: ClientDto): Observable<ClientDto>  {
    return this.http.post<ClientDto>(`${this.baseUrl}/addCli`, clientData);
  }



  retrieveClient(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/retrieve-client/${id}`);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    const url = `${this.baseUrl}/update/${id}`;
   return this.http.put<Client>(url, client);
   }

  deleteclient(id: any) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}

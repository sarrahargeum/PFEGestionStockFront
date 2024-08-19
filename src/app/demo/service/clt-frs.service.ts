import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { FournisseurService } from './fournisseur.service';
import { Observable } from 'rxjs';
import { Client } from '../modals/Client';
import { Fournisseur } from '../modals/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class CltFrsService {

  constructor(
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private fournisseurService: FournisseurService
  ) { }

  enregistrerClient(client:Client){
    client.idMagasin = this.authenticationService.getConnectedUser().magasin?.id;

    return this.clientService.saveClient(client);
  }

  
  enregistrerFournisseur(fournisseur: Fournisseur) {
    fournisseur.idMagasin = this.authenticationService.getConnectedUser().magasin?.id;
    return this.fournisseurService.postFournisseur(fournisseur);
  }

  findAllClients(): Observable<Client[]> {
    return this.clientService.getClient();
  }

  findAllFournisseurs(): Observable<Fournisseur[]> {
    return this.fournisseurService.getFournisseur();
  }

  findClientById(id: number): Observable<Client> {
      return this.clientService.retrieveClient(id);
  }

  findFournisseurById(id: number): Observable<Fournisseur> {
   
      return this.fournisseurService.retrieveFournisseur(id);
    
  }

  deleteClient(idClient: number): Observable<any> {
    
      return this.clientService.deleteclient(idClient);

  }

  deleteFournisseur(idFournisseur: number): Observable<any> {
      return this.fournisseurService.deletefourniseur(idFournisseur);
  
  }
}

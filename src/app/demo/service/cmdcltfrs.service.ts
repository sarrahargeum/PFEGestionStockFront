import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import { BonSortieService } from './bon-sortie.service';
import { BonEntreService } from './bon-entre.service';
import { AuthenticationService } from './authentication.service';
import { BonSortie } from '../modals/BonSortie';
import { BonEntree } from '../modals/BonEntree';
import { BonEntreeDto } from '../modals/DTO/BonEntreeDto';
import { BonSortieDto } from '../modals/DTO/BonSortieDto';


@Injectable({
  providedIn: 'root'
})
export class CmdcltfrsService {

  constructor(
    private bonSortieService: BonSortieService,
    private bonEntreService: BonEntreService,
    private authenticationService: AuthenticationService
  ) { }

  enregistrerCommandeClient(bonSortie: BonSortieDto): Observable<BonSortieDto> {
   /* bonSortie.idMagasin = this.authenticationService.getConnectedUser().magasin?.id;
    return this.bonSortieService.saveBonSortie(bonSortie);*/
    bonSortie.idMagasin = 1;

   return this.bonSortieService.saveBonSortie(bonSortie);
}


  enregistrerCommandeFournisseur(bonEntree: BonEntreeDto): Observable<BonEntreeDto> {
   bonEntree.idMagasin = 1;
    return this.bonEntreService.saveBonEntreFournisseur(bonEntree);
  }

  findAllCommandesClient(): Observable<BonSortieDto[]> {
    return this.bonSortieService.findAll();
  }

  findAllCommandesFournisseur(): Observable<BonEntreeDto[]> {
    return this.bonEntreService.findAll();
  }

  findAllLigneCommandesClient(idCmd?: number) {
    return this.bonSortieService.findAllLignesCommandesClientByCommandeClientId(idCmd);
   
  }

  findAllLigneCommandesFournisseur(idCmd?: number) {
      return this.bonEntreService.findAllLignesCommandesFournisseurByCommandeFournisseurId(idCmd);
  }



  deleteCmdClt(id: number){
    return this.bonSortieService.delete(id)
  }

  deleteCmdFour(id: number){
    return this.bonEntreService.delete(id)
  }
  
    
}

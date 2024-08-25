import {Component, Input, OnInit} from '@angular/core';
import { Client } from '../../modals/Client';
import { CmdcltfrsService } from '../../service/cmdcltfrs.service';
import { EtatCommande } from '../../modals/EtatCommande';
import { BonEntreService } from '../../service/bon-entre.service';
import { Router } from '@angular/router';
import { BonSortieService } from '../../service/bon-sortie.service';


@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.scss']
})
export class DetailCmdCltFrsComponent implements OnInit {

  @Input()
  origin = '';
  @Input()

  commande: any = {};
  cltFrs: Client | undefined ;
  listeCommandes =[];
  newEtatCommande: EtatCommande;
  showModal: boolean = false;
  etatsCommande: EtatCommande[] = [EtatCommande.EN_PREPARATIO, EtatCommande.VALIDE, EtatCommande.LIVREE]; 

  constructor(private cmdcltfrs: CmdcltfrsService,
    private bonEntreeService:BonEntreService,
    private bonSortieService:BonSortieService,
  ) { }

  ngOnInit(): void {
    this.extractClientFournisseur();
  
 
  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  modifierClick(): void {
    if (this.commande.id && this.newEtatCommande) {
      if (this.origin === 'fournisseur') {
        this.bonEntreeService.updateEtatCommande(this.commande.id, this.newEtatCommande)
          .subscribe(
            response => {
              console.log('Commande updated successfully with fournisseur');
              this.closeModal(); 
              window.location.reload();
            },
            error => {
              console.error('Error updating commande with fournisseur:', error);
            }
          );
      } else if (this.origin === 'client') {
        this.bonSortieService.updateEtatCommande(this.commande.id, this.newEtatCommande)
          .subscribe(
            response => {
              console.log('Commande updated successfully with client');
              this.closeModal(); 
              window.location.reload();
            },
            error => {
              console.error('Error updating commande with client:', error);
            }
          );
      }
    }
  }
  
deleteBonEntree(id: number): void {let message = '';
  let deleteObservable;

  if (this.origin === 'fournisseur') {
    message = 'Are you sure you want to delete this BonEntree?';
    deleteObservable = this.cmdcltfrs.deleteCmdFour(id);
  } else if (this.origin === 'client') {
    message = 'Are you sure you want to delete this BonSortie?';
    deleteObservable = this.cmdcltfrs.deleteCmdClt(id);
  }

  if (message && confirm(message)) {
    deleteObservable.subscribe(
      response => {
        console.log(`${this.origin === 'fournisseur' ? 'BonEntree' : 'BonSortie'} deleted successfully`);
        window.location.reload(); // Refresh the page or navigate to another route
      },
      error => {
        console.error(`Error deleting ${this.origin === 'fournisseur' ? 'BonEntree' : 'BonSortie'}:`, error);
      }
    );
  }
}
  

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande.fournisseur;
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import { Client } from '../../modals/Client';
import { CmdcltfrsService } from '../../service/cmdcltfrs.service';
import { EtatCommande } from '../../modals/EtatCommande';
import { BonEntreService } from '../../service/bon-entre.service';
import { BonSortieService } from '../../service/bon-sortie.service';


import { ToastrService } from 'ngx-toastr';

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
  etatsCommande: EtatCommande[] = [ EtatCommande.VALIDE]; 
  dataJson:any
  datauser:any
  constructor(private cmdcltfrs: CmdcltfrsService,
    private bonEntreeService:BonEntreService,
    private bonSortieService:BonSortieService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.datauser=localStorage.getItem("datauser")
    this.dataJson=JSON.parse(this.datauser)
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
              this.closeModal(); 
              window.location.reload();
              this.toastr.success('etat update successfully.', 'Success'); 
            }, error => {
              this.toastr.error('Failed to update etat livrée. Please try again.', 'Error'); 
            });
            
      } else if (this.origin === 'client') {
        this.bonSortieService.updateEtatCommande(this.commande.id, this.newEtatCommande)
          .subscribe(
            response => {
              this.closeModal(); 
              window.location.reload();
              this.toastr.success('etat update successfully.', 'Success'); 
            }, error => {
              this.toastr.error('Failed to update etat livrée. Please try again.', 'Error'); 
            });
      }
    }
  }
  
deleteBonEntree(id: number): void {let message = '';
  let deleteObservable;

  if (this.origin === 'fournisseur') {
    message = 'Are you sure you want to delete this BonEntree?';
    deleteObservable = this.cmdcltfrs.deleteCmdFour(id);
    this.toastr.success('Bon entree delete successfully.', 'Success'); 
   error => {
    this.toastr.error('Failed to delete bon entree. Please try again.', 'Error'); 
  }
  
  } else if (this.origin === 'client') {
    message = 'Are you sure you want to delete this BonSortie?';
    deleteObservable = this.cmdcltfrs.deleteCmdClt(id);
  }

  if (message && confirm(message)) {
    deleteObservable.subscribe(
      response => {
        window.location.reload(); 
        this.toastr.success('Bon entree delete successfully.', 'Success'); 
        error => {
         this.toastr.error('Failed to delete bon entree. Please try again.', 'Error'); 
   } });
      }
}
  

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande.fournisseur;
    }
  }
 

validerCommande(commandeId: number): void {
  const etatCommande = EtatCommande.VALIDE;

  if (this.origin === 'fournisseur') {
    this.bonEntreeService.updateEtatCommande(commandeId, etatCommande)
      .subscribe(
        response => {
          window.location.reload(); 
          this.toastr.success('Commande validée avec succès.', 'Succès');
        },
        error => {
          this.toastr.error('Erreur lors de la validation de la commande.', 'Erreur');
        }
      );
  } else if (this.origin === 'client') {
    this.bonSortieService.updateEtatCommande(commandeId, etatCommande)
      .subscribe(
        response => {
          window.location.reload(); 

          this.toastr.success('Commande validée avec succès.', 'Succès');
        },
        error => {
          this.toastr.error('Erreur lors de la validation de la commande.', 'Erreur');
        }
      );
  }}}
import {Component, Input, OnInit} from '@angular/core';
import { Client } from '../../modals/Client';
import { CmdcltfrsService } from '../../service/cmdcltfrs.service';


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
  constructor(private cmdcltfrs: CmdcltfrsService) { }

  ngOnInit(): void {
    this.extractClientFournisseur();
  
 
  }
  modifierClick(): void {
  }

  deleteCmdFour(id: number): void {
    if (this.origin === 'client') {
      this.cmdcltfrs.deleteCmdClt(id).subscribe(
        response => {
          console.log('Delete successful', response);
     //     this.refreshListeCommandes(); 
        },
        error => {
          alert('Impossible de supprimer une commande client déjà utilisée.');
        }
      );
    } else if (this.origin === 'fournisseur') {
      this.cmdcltfrs.deleteCmdFour(id).subscribe(
        response => {
          console.log('Delete successful', response);
//this.refreshListeCommandes(); 
        },
        error => {
          alert('Impossible de supprimer une commande fournisseur déjà utilisée.');
        }
      );
    }
  }
  

 /* refreshListeCommandes(): void {
    if (this.origin === 'client') {
          this.cmdcltfrs.findAllCommandesClient().subscribe(
      data => {
        this.listeCommandes = data;
      },
     
    );
  }else{
    if (this.origin === 'fournisseur') {
      this.cmdcltfrs.findAllCommandesFournisseur().subscribe(
  data => {
    this.listeCommandes = data;
  },
);
  }}
}*/
  

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande.fournisseur;
    }
  }
}

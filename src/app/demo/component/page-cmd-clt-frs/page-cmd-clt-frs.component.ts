import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CmdcltfrsService } from '../../service/cmdcltfrs.service';
import { LigneSortieDto } from '../../modals/DTO/ligneSortieDto';
import { BonEntreService } from '../../service/bon-entre.service';
import { BonEntreeDto } from '../../modals/DTO/BonEntreeDto';


@Component({
  selector: 'app-page-cmd-clt-frs',
  templateUrl: './page-cmd-clt-frs.component.html',
  styleUrls: ['./page-cmd-clt-frs.component.scss']
})
export class PageCmdCltFrsComponent implements OnInit {

  origin = '';
  listeCommandes: any[] = [];
  mapLignesCommande = new Map();
  mapPrixTotalCommande = new Map();
  listBonEntree:BonEntreeDto;
  codeCmd: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmdCltFrsService: CmdcltfrsService,
    private bonEntreeService:BonEntreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data.origin;
    });
    this.findAllCommandes();
  }

  findAllCommandes(): void {
    if (this.origin === 'client') {
      this.cmdCltFrsService.findAllCommandesClient()
      .subscribe(cmd => {
        this.listeCommandes = cmd;
        this.findAllLignesCommande();
      });
    } else if (this.origin === 'fournisseur') {
      this.cmdCltFrsService.findAllCommandesFournisseur()
      .subscribe(cmd => {
        this.listeCommandes = cmd;
        this.findAllLignesCommande();
      });
    }
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach(cmd => {
     this.findLignesCommande(cmd.id);
    });
  }

  nouvelleCommande(): void {
    if (this.origin === 'client') {
      this.router.navigate(['nouvellecommandeclt']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouvellecommandefrs']);
    }
  }

  findLignesCommande(idCommande?: number): void {
    if (this.origin === 'client') {
      this.cmdCltFrsService.findAllLigneCommandesClient(idCommande)
      .subscribe(list => {
        this.mapLignesCommande.set(idCommande, list);
        this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
      });
    } else if (this.origin === 'fournisseur') {
      this.cmdCltFrsService.findAllLigneCommandesFournisseur(idCommande)
      .subscribe(list => {
        this.mapLignesCommande.set(idCommande, list);
        this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
      });
    }
  }

  calculerTatalCmd(list: Array<LigneSortieDto>): number {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }

  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id);
  }


  getFactureRoute(id: number): string[] {
    if (this.origin === 'fournisseur') {
      return ['/facture', id.toString()];
    } else if (this.origin === 'client') {
      return ['/factureCLT', id.toString()];
    }
    return ['/']; 
  }

  
}

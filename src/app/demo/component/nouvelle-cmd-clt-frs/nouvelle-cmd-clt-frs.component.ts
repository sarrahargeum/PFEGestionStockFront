import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Article } from '../../modals/article';
import { CltFrsService } from '../../service/clt-frs.service';
import { ArticleService } from '../../service/article.service';
import { CmdcltfrsService } from '../../service/cmdcltfrs.service';
import { BonSortieClient } from '../../modals/BonSortie';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../modals/category';
import { ArticleDto } from '../../modals/DTO/ArticleDto';
import { BonEntree } from '../../modals/BonEntree';
import { LigneSortieDto } from '../../modals/DTO/ligneSortieDto';
import { BonEntreeDto } from '../../modals/DTO/BonEntreeDto';
import { BonSortieDto } from '../../modals/DTO/BonSortieDto';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  templateUrl: './nouvelle-cmd-clt-frs.component.html',
  styleUrls: ['./nouvelle-cmd-clt-frs.component.scss']
})
export class NouvelleCmdCltFrsComponent implements OnInit {

  origin = '';
  selectedClientFournisseur: any = {};
  listClientsFournisseurs: Array<any> = [];
 searchedArticle: ArticleDto = {};
  listArticle: Array<ArticleDto> = [];
  codeArticle = '';
  quantite = '';
  codeCommande = '';

  lignesCommande: Array<any> = [];
  totalCommande = 0;
  articleNotYetSelected = false;
  errorMsg: Array<string> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cltFrsService: CltFrsService,
    private articleService: ArticleService,
    private cmdCltFrsService: CmdcltfrsService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data.origin;
    });
    this.findAllClientsFournisseurs();
    this.findAllArticles();
  }

  findAllClientsFournisseurs(): void {
    if (this.origin === 'client') {
      this.cltFrsService.findAllClients()
      .subscribe(clients => {
        this.listClientsFournisseurs = clients;
      });
    } else if (this.origin === 'fournisseur' ) {
      this.cltFrsService.findAllFournisseurs()
      .subscribe(fournisseurs => {
        this.listClientsFournisseurs = fournisseurs;
      });
    }
  }

  findAllArticles(): void {
    this.articleService.getArticle()
    .subscribe(articles => {
      this.listArticle = articles;
    });
  }

  filtrerArticle(): void {
    if (this.codeArticle.length === 0) {
      this.findAllArticles();
    }
    this.listArticle = this.listArticle
    .filter(art => art.code?.includes(this.codeArticle) || art.designation?.includes(this.codeArticle));
  }

  ajouterLigneCommande(): void {
    this.checkLigneCommande();
    this.calculerTotalCommande();

    this.quantite = '';
    this.codeArticle= '';
    this.articleNotYetSelected = false;
    this.findAllArticles();
  }

  calculerTotalCommande(): void {
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite;
      }
    });
  }

  private checkLigneCommande(): void {
    const ligneCmdAlreadyExists = this.lignesCommande.find(lig => lig.article?.codeArticle === this.searchedArticle.code);
    if (ligneCmdAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig && lig.article?.codeArticle === this.searchedArticle.code) {
          lig.quantite = lig.quantite + +this.quantite;
        }
      });
    } else {
      const ligneCmd: LigneSortieDto = {
        article: this.searchedArticle,
        prixUnitaire: this.searchedArticle.prix,
        quantite: +this.quantite,
     
      };
      this.lignesCommande.push(ligneCmd);
    }
  }

  selectArticleClick(article: ArticleDto): void {
    this.searchedArticle = article;
    this.codeArticle = article.code ? article.code : '';
    this.articleNotYetSelected = true;
  }

 
  enregistrerCommande(): void {
    const commande = this.preparerCommande();
  
    if (this.origin === 'client') {
      this.cmdCltFrsService.enregistrerCommandeClient(commande as BonSortieDto)
        .subscribe(
          cmd => {
            this.toastr.success('Commandes client added successfully.', 'Success');
            this.router.navigate(['commandesclient']);
          },
          error => {
            this.toastr.error('Failed to add commandes client. Please try again.', 'Error');
          }
        );
    } else if (this.origin === 'fournisseur') {
      this.cmdCltFrsService.enregistrerCommandeFournisseur(commande as BonEntreeDto)
        .subscribe(
          cmd => {
            this.toastr.success('Commandes fournisseur added successfully.', 'Success');
            this.router.navigate(['commandesfournisseur']);
          },
          error => {
            this.toastr.error('Failed to add commandes fournisseur. Please try again.', 'Error');
          }
        );
    }
  }
  

  private preparerCommande(): any {
    if (this.origin === 'client') {
      return  {
        client: this.selectedClientFournisseur,
        code: this.codeCommande,
        dateCommande: new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneSorties: this.lignesCommande
      };
    } else if (this.origin === 'fournisseur') {
      return  {
        fournisseur: this.selectedClientFournisseur,
        code: this.codeCommande,
        dateCommande: new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneEntrees: this.lignesCommande
      };
    }
  }
}

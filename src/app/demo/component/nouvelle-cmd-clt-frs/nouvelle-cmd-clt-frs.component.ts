import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Article } from '../../modals/article';
import { CltFrsService } from '../../service/clt-frs.service';
import { ArticleService } from '../../service/article.service';
import { CmdcltfrsService } from '../../service/cmdcltfrs.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../modals/category';
import { ArticleDto } from '../../modals/DTO/ArticleDto';
import { BonEntree } from '../../modals/BonEntree';
import { LigneSortieDto } from '../../modals/DTO/ligneSortieDto';
import { BonEntreeDto } from '../../modals/DTO/BonEntreeDto';
import { BonSortieDto } from '../../modals/DTO/BonSortieDto';
import { ToastrService } from 'ngx-toastr';
import { StockService } from '../../service/stock.service';


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
    private toastr : ToastrService,
    private stockService :StockService
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
      this.listArticle = articles.filter(article => article.stockDisponible > 0);
    });
  }

  filtrerArticle(): void {
    if (this.codeArticle) {
      // Filter the list of articles based on the codeArticle input
      this.listArticle = this.listArticle.filter(article => 
        article.code.includes(this.codeArticle) || 
        article.designation.includes(this.codeArticle)
      );
    } else {
      // If input is empty, retrieve all articles again
      this.findAllArticles();
    }
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
    
      const checkStockAvailability = (): boolean => {
        let stockIsSufficient = true;
    
        if (this.origin === 'client' && commande.ligneSorties) {
          commande.ligneSorties.forEach((ligne: any) => {
            const articleId = ligne.article.id;
            const requestedQuantity = ligne.quantite;
    
            this.stockService.stockReelArticle(articleId).subscribe(
              (stock: number) => {
                if (stock < requestedQuantity) {
                  this.toastr.error(
                    `Stock insuffisant pour cette article . Stock disponible: ${stock}, quantité demandée: ${requestedQuantity}.`,
                    'Erreur'
                  );
                  stockIsSufficient = false;
                }
              },
              (error) => {
                this.toastr.error(`Erreur lors de la vérification du stock pour l'article ${articleId}.`, 'Erreur');
                stockIsSufficient = false;
              }
            );
          });
        }
    
        return stockIsSufficient;
      };
    
      if (checkStockAvailability()) {
        if (this.origin === 'client') {
          this.cmdCltFrsService.enregistrerCommandeClient(commande as BonSortieDto)
            .subscribe(
              cmd => {
                this.toastr.success('Commandes client ajoutée avec succès.', 'Succès');
                this.router.navigate(['commandesclient']);
              }
            );
        } else if (this.origin === 'fournisseur') {
          this.cmdCltFrsService.enregistrerCommandeFournisseur(commande as BonEntreeDto)
            .subscribe(
              cmd => {
                this.toastr.success('Commandes fournisseur ajoutée avec succès.', 'Succès');
                this.router.navigate(['commandesfournisseur']);
              },
              error => {
                this.toastr.error('Échec de l\'ajout de la commande fournisseur. Veuillez réessayer.', 'Erreur');
              }
            );
        }
      }
    }
    
  

  private preparerCommande(): any {
    if (this.origin === 'client') {
      return  {
        client: this.selectedClientFournisseur,
        dateCommande: new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneSorties: this.lignesCommande
      };
    } else if (this.origin === 'fournisseur') {
      return  {
        fournisseur: this.selectedClientFournisseur,
        dateCommande: new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneEntrees: this.lignesCommande
      };
    }
  }
}

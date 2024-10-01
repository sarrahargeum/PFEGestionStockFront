import { Article } from "./article";
import { ArticleDto } from "./DTO/ArticleDto";
import { BonSortie } from "./BonSortie";
import { EtatCommande } from "./EtatCommande";

export class LigneSortie {
    id: number;
    quantite: number;
    prixUnitaire: number;
    article: Article;     
    idMagasin: number;
    bonSortie: BonSortie; 



  }
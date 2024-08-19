import { Article } from "./article";
import { ArticleDto } from "./DTO/ArticleDto";
import { BonSortieClient } from "./BonSortie";

export class LigneSortie {
    id: number;
    quantite: number;
    prixUnitaire: number;
    article: ArticleDto;     
    idMagasin: number;
    bonSortieClient: BonSortieClient; 


  }
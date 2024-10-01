import { ArticleDto } from "./ArticleDto";
import { BonEntree } from "../BonEntree";
import { EtatCommande } from "../EtatCommande";

export class LigneEntreeDto{
    id?: number;  
    quantite: number;
    prixUnitaire: number;
    article: ArticleDto;
    bonEntree: BonEntree;
    idMagasin: number;
  }
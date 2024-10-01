
import { BonEntree } from "./BonEntree";
import { EtatCommande } from "./EtatCommande";
import { Article } from "./article";


export class LigneEntree{
  id?: number;  
  quantite: number;
  prixUnitaire: number;
  article: Article;
  bonEntree: BonEntree;
  idMagasin: number;
}

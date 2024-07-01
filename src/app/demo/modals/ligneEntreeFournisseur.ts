import { EtatCommande } from "./EtatCommande";
import { Article } from "./article";


export class LigneEntreeFournisseur {
  id?: number;  
  quantite: number;
  prixUnitaire: number;
  article: Article;
  //bonEntreFournisseur: BonEntreFournisseur;
  etatCommande: EtatCommande;
  idMagasin: number;
}

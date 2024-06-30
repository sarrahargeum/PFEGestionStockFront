import { Article } from "./article";

export enum EtatCommande {
    EN_PREPARATIO ='EN_PREPARATION',
    VALIDE ='VALIDEE',
    LIVREE= 'LIVREE',
  }

export class LigneEntreeFournisseur {
  id?: number;  
  quantite: number;
  prixUnitaire: number;
  article: Article;
  //bonEntreFournisseur: BonEntreFournisseur;
  etatCommande: EtatCommande;
  idMagasin: number;
}

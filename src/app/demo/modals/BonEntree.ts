import { EtatCommande } from "./EtatCommande";
import { Fournisseur } from "./fournisseur";
import { LigneEntree } from "./ligneEntree";

export class BonEntree {
    id: number;
    code: string;
    dateCommande: Date; 
    etatCommande: EtatCommande;
    idMagasin: number;
    fournisseur: Fournisseur;
    ligneEntree: LigneEntree[]; 
  

  }
  
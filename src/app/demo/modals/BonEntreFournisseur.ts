import { EtatCommande } from "./EtatCommande";
import { Fournisseur } from "./fournisseur";
import { LigneEntreeFournisseur } from "./ligneEntreeFournisseur";

export class BonEntreFournisseur {
    id: number;
    code: string;
    dateCommande: Date; 
    etatCommande: EtatCommande;
    idMagasin: number;
    fournisseur: Fournisseur;
    ligneEntreeFournisseurs: LigneEntreeFournisseur[]; 
  

  }
  
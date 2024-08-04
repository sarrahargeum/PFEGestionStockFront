import { Client } from "./Client";
import { EtatCommande } from "./EtatCommande";
import { Fournisseur } from "./fournisseur";
import { LigneEntreeFournisseur } from "./ligneEntreeFournisseur";

export class BonSortieClient {
    id: number;
    code: string;
    dateCommande: Date; 
    etatCommande: EtatCommande;
    idMagasin: number;
    client: Client;
    ligneEntreeFournisseurs: LigneEntreeFournisseur[]; 
  

  }
  
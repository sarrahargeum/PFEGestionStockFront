import { Client } from "./Client";
import { EtatCommande } from "./EtatCommande";
import { LigneSortie } from "./ligneSortie";

export class BonSortie {
    id: number;
    code: string;
    dateCommande: Date; 
    etatCommande: EtatCommande;
    idMagasin: number;
    client: Client;
    ligneSortie: LigneSortie[]; 
  

  }
  
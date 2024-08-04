import { BonEntreFournisseur } from "./BonEntreFournisseur";
import { Magasin } from "./magasin";

export class Fournisseur {
    id: number;
    nom: string;
    prenom: string;
    adresse:string;
    numTel:string;
    mail:string;
    magasin:Magasin;
    idMagasin:number;
    bonEntreFournisseur?: Array<BonEntreFournisseur>;


  }

import { BonEntree } from "./BonEntree";
import { Magasin } from "./magasin";

export class Fournisseur {
    id: number;
    nom: string;
    prenom: string;
    adresse:string;
    numTel:string;
    mail:string;
    idMagasin:number;
    bonEntreFournisseur?: Array<BonEntree>;


  }

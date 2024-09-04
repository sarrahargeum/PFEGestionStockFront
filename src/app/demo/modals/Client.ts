import { BonSortie } from "./BonSortie";

export class Client {
    id: number;
    nom: string;
    prenom: string;
    adresse:string;
    numTel:string;
    idMagasin:number;
    bonSorties?: Array<BonSortie>;


  }

import { BonSortieClient } from "./BonSortie";
import { Magasin } from "./magasin";

export class Client {
    id: number;
    nom: string;
    prenom: string;
    adresse:string;
    numTel:string;
    mail:string;
    magasin:Magasin;
    idMagasin:number;
    bonSortieClients?: Array<BonSortieClient>;


  }

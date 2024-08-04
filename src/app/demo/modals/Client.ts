import { BonEntreeComponent } from "../component/bon-livraison/bon-entree/bon-entree.component";
import { BonEntreFournisseur } from "./BonEntreFournisseur";
import { BonSortieClient } from "./BonSortieClient";
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

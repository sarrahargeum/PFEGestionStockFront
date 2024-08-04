import { BonSortieComponent } from "../component/bon-livraison/bon-sortie/bon-sortie.component";
import { BonSortieClient } from "./BonSortieClient";

export class LigneSortieClient {
    id: number;
    quantite: number;
    prixUnitaire: number;
    articleId: number;     
    idMagasin: number;
    bonSortieClient: BonSortieClient; 


  }
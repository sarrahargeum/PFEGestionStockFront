import { Category } from "./category";
import { LigneEntreeFournisseur } from "./ligneEntreeFournisseur";
import { LigneSortieClient } from "./ligneSortieClient";
import { MvtStk } from "./mvtStock";

export class Article {
    id: number;
    code: string;
    designation: string;
    prix: number;
    tauxTva :number;
    image :String;
    category: Category;
    ligneSortieClients?: Array<LigneSortieClient>;
    ligneEntreeFournisseurs?: Array<LigneEntreeFournisseur>;
    mvtStks?: Array<MvtStk>;
  
}

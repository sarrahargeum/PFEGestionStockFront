import { Category } from "./category";
import { LigneEntree } from "./ligneEntree";
import { LigneSortie } from "./ligneSortie";
import { MvtStk } from "./mvtStock";

export class Article {
    id: number;
    code: string;
    designation: string;
    prix: number;
    tauxTva :number;
    image :String;
    category: Category;
    ligneSortie?: Array<LigneSortie>;
    ligneEntree?: Array<LigneEntree>;
    mvtStks?: Array<MvtStk>;
  
}

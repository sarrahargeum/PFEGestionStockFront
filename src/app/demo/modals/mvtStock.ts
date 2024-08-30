import { Article } from "./article";
import { Magasin } from "./magasin";

export enum TypeStock {
    ENTREE = 'ENTREE',
    SORTIE = 'SORTIE',
  }

  export class MvtStk {
    id: number;
    quantite: number;
    dateMvt: Date;
    article:Article;
    typestock:TypeStock;
    magasin:Magasin


  }

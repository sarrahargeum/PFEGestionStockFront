import { Magasin } from "./magasin";

export enum TypeStock {
    ENTREE = 'ENTREE',
    SORTIE = 'SORTIE',
  }

  export class MvtStk {
    id: number;
    quantite: number;
    dateMvt: Date;
    typestock:TypeStock;
    magasin:Magasin


  }

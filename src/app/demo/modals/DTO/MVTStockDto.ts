import { ArticleDto } from "./ArticleDto";



export enum TypeStockDto {
    ENTREE = 'ENTREE',
    SORTIE = 'SORTIE',
  }

export interface MVTStockDto {
    id?: number;
    dateMvt?: Date;
    quantite?: number;
    typeMvt?: TypeStockDto; 
    article:ArticleDto;

  }
  
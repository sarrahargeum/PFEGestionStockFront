import { Article } from '../article';
import { BonSortie } from '../BonSortie';
import { ArticleDto } from './ArticleDto';
export interface LigneSortieDto {
  id?: number;
  article?: ArticleDto;
  quantite?: number;
  prixUnitaire?: number;
  idMagasin?: number;
}

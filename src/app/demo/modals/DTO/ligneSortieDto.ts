import { Article } from '../article';
import { ArticleDto } from './ArticleDto';
export interface LigneSortieDto {
  id?: number;
  article?: ArticleDto;
  quantite?: number;
  prixUnitaire?: number;
  idMagasin?: number;
}

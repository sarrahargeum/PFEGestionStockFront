import { Category } from '../category';

export class ArticleDto {
    id?: number;
    code?: string;
    designation?: string;
    prix?: number;
    tauxTva?: number;
    image?: string;
    category?: Category;
    idMagasin?: number;
}

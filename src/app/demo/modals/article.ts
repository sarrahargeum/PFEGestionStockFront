import { Category } from "./category";

export class Article {
    id: number;
    code: string;
    designation: string;
    prix: number;
    tauxTva :number;
    image :String;
    category: Category;
  
}

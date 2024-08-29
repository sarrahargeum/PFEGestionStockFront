/* tslint:disable */
import { EtatCommande } from '../EtatCommande';
import { ClientDto } from './ClientDto';
import { LigneSortieDto } from './ligneSortieDto';
export class BonSortieDto {
    id?: number;
    code?: string;
    dateCommande?: Date;
    etatCommande?: EtatCommande;
    client?: ClientDto;
    idMagasin?: number;
    ligneSorties?: Array<LigneSortieDto>;
    commandeLivree?: boolean;
    }


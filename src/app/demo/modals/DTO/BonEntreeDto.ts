import { EtatCommande } from "../EtatCommande";
import { FournisseurDto } from "./FournisseurDto";
import { LigneEntreeDto } from "./LigneEntreeDto";

export interface BonEntreeDto {
    id?: number;
    code?: string;
    dateCommande?: Date;
    etatCommande?: EtatCommande;
    fournisseur?: FournisseurDto;
    idMagasin?: number;
    ligneEntrees?: Array<LigneEntreeDto>;
    commandeLivree?: boolean;
  }


 
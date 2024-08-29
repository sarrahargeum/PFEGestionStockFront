import { EtatCommande } from "../EtatCommande";
import { FournisseurDto } from "./FournisseurDto";
import { LigneEntree } from "../ligneEntree";

export interface BonEntreeDto {
    id?: number;
    code?: string;
    dateCommande?: Date;
    etatCommande?: EtatCommande;
    fournisseur?: FournisseurDto;
    idMagasin?: number;
    ligneEntrees?: Array<LigneEntree>;
    commandeLivree?: boolean;
  }


 
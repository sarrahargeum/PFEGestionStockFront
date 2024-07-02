import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BonEntreFournisseur } from 'src/app/demo/modals/BonEntreFournisseur';
import { Fournisseur } from 'src/app/demo/modals/fournisseur';
import { Magasin } from 'src/app/demo/modals/magasin';
import { BonEntreService } from 'src/app/demo/service/bon-entre.service';
import { FournisseurService } from 'src/app/demo/service/fournisseur.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';

@Component({
  selector: 'app-detail-bon-entree',
  templateUrl: './detail-bon-entree.component.html',
  styleUrl: './detail-bon-entree.component.scss'
})
export class DetailBonEntreeComponent implements OnInit{

  listBonEntree:BonEntreFournisseur[];
  listMagasin: Array<Magasin> = [];
  listfournisseur: Fournisseur[] = [];
  constructor(
    private bonEntreService: BonEntreService,
    private fournisseurService: FournisseurService,
    private magasinService: MagasinService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.magasinService.getMagasin().subscribe(magasins => {
      this.listMagasin = magasins;
    });

    this.fournisseurService.getFournisseur().subscribe((data: Fournisseur[]) => {
      this.listfournisseur = data;
    });

    this.bonEntreService.findAll().subscribe(
      (data: BonEntreFournisseur[]) => this.listBonEntree = data
    );


}
}

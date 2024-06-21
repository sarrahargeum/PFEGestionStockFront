import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinService } from 'src/app/demo/service/magasin.service';
import { Magasin } from 'src/app/demo/modals/magasin';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Fournisseur } from 'src/app/demo/modals/fournisseur';
import { FournisseurService } from 'src/app/demo/service/fournisseur.service';

@Component({
  selector: 'app-listfournisseur',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './listfournisseur.component.html',
  styleUrls: ['./listfournisseur.component.scss']
})
export class ListfournisseurComponent   implements OnInit {
  listfournisseur: Fournisseur[] = [];
  nom: string = '';
  fournisseurForm: FormGroup;
  submitted = false;
  showModal = false; 
  isEditMode = false;
  modalTitle = 'Ajouter Fournisseur';
  id: number | null = null;
  listeMagasin: Array<Magasin> = [];

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router,
    private formBuilder: FormBuilder,
    private magasinService: MagasinService,
  ) { }

  ngOnInit(): void {
    this.magasinService.getMagasin().subscribe(magasins => {
      this.listeMagasin = magasins;
    });

    this.fournisseurService.getFournisseur().subscribe((data: Fournisseur[]) => {
      this.listfournisseur = data;
    });

    this.fournisseurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      numTel: ['', [Validators.required, Validators.minLength(5)]],
      magasinId: ['', Validators.required],
    });
  }

  refrechFournisseurList() {
    this.fournisseurService.getFournisseur().subscribe(data => {
      this.listfournisseur = data;
    });
  }

  deleteClick(id: number) {
    if (confirm('Are you sure to delete this project')) {
      this.fournisseurService.deletefourniseur(id).subscribe(() => {
        this.refrechFournisseurList();
      });
    }
  }

  Search() {
    if (this.nom !== "") {
      this.listfournisseur = this.listfournisseur.filter(res => {
        return res.nom.toLocaleLowerCase().includes(this.nom.toLocaleLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  openModal(mode: 'add' | 'edit', fournisseurId?: number) {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter Fournisseur';
      this.isEditMode = false;
      this.fournisseurForm.reset();

    } else if (mode === 'edit' && fournisseurId != null) {
      this.modalTitle = 'Modifier Fournisseur';
      this.isEditMode = true;
      this.id = fournisseurId;

      this.fournisseurService.retrieveFournisseur(fournisseurId).subscribe(fournisseur => {
        this.fournisseurForm.patchValue({
          nom: fournisseur.nom,
          prenom: fournisseur.prenom,
          adresse: fournisseur.adresse,
          numTel: fournisseur.numTel,
          magasinId: fournisseur.magasin.id
        });
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.fournisseurForm.reset();
    this.submitted = false;
    this.isEditMode = false;
    this.id = null;
  }

  save() {
    this.submitted = true;

   const fournisseurForm = {
     nom: this.f.nom.value,
     prenom: this.f.prenom.value,
     adresse: this.f.adresse.value,
     numTel: this.f.numTel.value,
     
     magasin: {
       id: this.f.magasinId.value

     }
   };

    if (!this.isEditMode) {
      this.fournisseurService.postFournisseur(fournisseurForm).subscribe(() => {
        this.refrechFournisseurList();
        this.closeModal();
      });
    } else if (this.id != null) {
      this.fournisseurService.updateFournisseur(this.id, this.fournisseurForm.value).subscribe(() => {
        this.refrechFournisseurList();
        this.closeModal();
      });
    }
  }

  get f() {
    return this.fournisseurForm.controls;
  }
}
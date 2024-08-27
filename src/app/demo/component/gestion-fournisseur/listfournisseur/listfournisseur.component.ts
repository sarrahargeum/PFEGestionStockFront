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
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.fournisseurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      numTel: ['', [Validators.required, Validators.minLength(5)]],
      magasinId: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
    });
    this.refrechFournisseurList();
  }

  refrechFournisseurList() {

    this.fournisseurService.getFournisseur().subscribe(data => {
      this.listfournisseur = data;
      this.magasinService.getMagasin().subscribe(maga => this.listeMagasin = maga);
    });

   
  }

  deleteClick(id: number) {
    if (confirm('Are you sure to delete this project')) {
      this.fournisseurService.deletefourniseur(id).subscribe(() => {
        this.refrechFournisseurList();
        this.toastr.success('Fournisseur delete successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to delete fournisseur. Please try again.', 'Error'); 
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
          mail: fournisseur.mail,
        //magasinId: fournisseur.magasin.nom
         magasinId: fournisseur.idMagasin  
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
        mail: this.f.mail.value,
        idMagasin: this.f.magasinId.value,  

    };

    if (!this.isEditMode) {
        // Create a new Fournisseur
        this.fournisseurService.postFournisseur(fournisseurForm).subscribe(() => {
            this.refrechFournisseurList();
            this.closeModal();
            this.toastr.success('Fournisseur added successfully.', 'Success');
        }, error => {
            this.toastr.error('Failed to add Fournisseur. Please try again.', 'Error');
        });
    } else if (this.id != null) {
        // Update an existing Fournisseur
        this.fournisseurService.updateFournisseur(this.id,this.fournisseurForm.value).subscribe(() => {
            this.refrechFournisseurList();
            this.closeModal();
            this.toastr.success('Fournisseur updated successfully.', 'Success');
        }, error => {
            this.toastr.error('Failed to update Fournisseur. Please try again.', 'Error');
        });
    }
}


  get f() {
    return this.fournisseurForm.controls;
  }
}
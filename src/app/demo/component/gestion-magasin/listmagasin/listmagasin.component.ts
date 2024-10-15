import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagasinService } from 'src/app/demo/service/magasin.service';
import { Magasin } from 'src/app/demo/modals/magasin';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listmagasin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './listmagasin.component.html',
  styleUrls: ['./listmagasin.component.scss']
})
export class ListmagasinComponent implements OnInit {
  listMagasin: Magasin[];
  nom: string = '';
  magasinForm: FormGroup;
  submitted = false;
  showModal = false; 
  isEditMode = false;
  modalTitle = 'Ajouter Magasin';
  id;

  constructor(
    private magasinService: MagasinService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.magasinService.getMagasin().subscribe(
      (data: Magasin[]) => this.listMagasin = data
    );

    this.magasinForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
      numTel: ['', Validators.required],
      siteWeb: ['', Validators.required],
    });
  }

 

  refrechMgList() {
    this.magasinService.getMagasin().subscribe(data => {
      this.listMagasin = data;
    });
  }

  deleteClick(id) {
    if (confirm('Are you sure to delete this project')) {
      this.magasinService.deleteMagasin(id).subscribe(data => {
        this.refrechMgList();
        this.toastr.success('Magasin delete successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to delete Magasin. Please try again.', 'Error'); 
      }); 
       }
  }

  Search() {
    if (this.nom != "") {
      this.listMagasin = this.listMagasin.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    } else if (this.nom == "") {
      this.ngOnInit();
    }
  }
  openModal(mode: 'add' | 'edit', magasinId?: number) {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter Category';
      this.isEditMode = false;
      this.magasinForm.reset();
    } else if (mode === 'edit' && magasinId != null) {
      this.modalTitle = 'Modifier Category';
      this.isEditMode = true;
      this.id = magasinId;

      this.magasinService.retrieveMagasin(magasinId).subscribe(magasin => {
        this.magasinForm.patchValue({
          nom: magasin.nom,
          description: magasin.description,
          email: magasin.email,
          numTel: magasin.numTel,
          siteWeb:magasin.siteWeb
        });
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.magasinForm.reset();
    this.submitted = false;
    this.isEditMode = false;
    this.id = null;
  }

  save() {
    this.submitted = true;
    if (this.magasinForm.invalid) {
      return;
    }

    if (!this.isEditMode) {
      this.magasinService.postMagasin(this.magasinForm.value).subscribe(() => {
        this.refrechMgList();
        this.closeModal();
        this.toastr.success('Magasin added successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to added Magasin. Please try again.', 'Error'); 
      });     } else {
      // Update existing category
      this.magasinService.updateMagasin(this.id!, this.magasinForm.value).subscribe(() => {
        this.refrechMgList();
        this.closeModal();
        this.toastr.success('Magasin update successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to update Magasin. Please try again.', 'Error');
      });     }
  }

  get f() {
    return this.magasinForm.controls;
  }
}
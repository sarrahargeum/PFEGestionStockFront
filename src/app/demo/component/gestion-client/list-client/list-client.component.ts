import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/demo/modals/Client';
import { Magasin } from 'src/app/demo/modals/magasin';
import { ClientService } from 'src/app/demo/service/client.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,NgxPaginationModule],

  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss'
})
export class ListClientComponent  implements OnInit {
  listclient: Client[] = [];
  nom: string = '';
  clientForm: FormGroup;
  submitted = false;
  showModal = false; 
  isEditMode = false;
  modalTitle = 'Ajouter Client';
  id: number | null = null;
  listeMagasin: Array<Magasin> = [];
  page: any = 1;
  

  constructor(
    private clientService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder,
    private magasinService: MagasinService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      numTel: ['', [Validators.required, Validators.minLength(5)]],
      magasinId: ['', Validators.required],
    });
    this.refrechClientList();
  }

  refrechClientList() {

    this.clientService.getClient().subscribe(data => {
      this.listclient = data;
      this.magasinService.getMagasin().subscribe(maga => this.listeMagasin = maga);
    });

   
  }

  deleteClick(id: number) {
    if (confirm('Are you sure to delete this client')) {
      this.clientService.deleteclient(id).subscribe(() => {
        this.refrechClientList();
        this.toastr.success('client delete successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to delete client. Please try again.', 'Error'); 
      });
        }
  }

  Search() {
    if (this.nom !== "") {
      this.listclient = this.listclient.filter(res => {
        return res.nom.toLocaleLowerCase().includes(this.nom.toLocaleLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  openModal(mode: 'add' | 'edit', clientId?: number) {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter Client';
      this.isEditMode = false;
      this.clientForm.reset();

    } else if (mode === 'edit' && clientId != null) {
      this.modalTitle = 'Modifier Client';
      this.isEditMode = true;
      this.id = clientId;

      this.clientService.retrieveClient(clientId).subscribe(client => {
        this.clientForm.patchValue({
          nom: client.nom,
          prenom: client.prenom,
          adresse: client.adresse,
          numTel: client.numTel,
        
        });
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.clientForm.reset();
    this.submitted = false;
    this.isEditMode = false;
    this.id = null;
  }

  save() {
    this.submitted = true;

    const clientForm = {
      id: this.isEditMode ? this.id : undefined, 

      nom: this.f.nom.value,
      prenom: this.f.prenom.value,
      adresse: this.f.adresse.value,
      numTel: this.f.numTel.value,
      idMagasin: this.f.magasinId.value,
       

    };

    if (!this.isEditMode) {
        this.clientService.saveClient(clientForm).subscribe(() => {
            this.refrechClientList();
            this.closeModal();
            this.toastr.success('Client added successfully.', 'Success');
        }, error => {
            this.toastr.error('Failed to add Client. Please try again.', 'Error');
        });
    } else if (this.id != null) {
        // Update an existing Fournisseur
        this.clientService.updateClient(this.id,this.clientForm.value).subscribe(() => {
            this.refrechClientList();
            this.closeModal();
            this.toastr.success('Client updated successfully.', 'Success');
        }, error => {
            this.toastr.error('Failed to update Client. Please try again.', 'Error');
        });
    }
}


  get f() {
    return this.clientForm.controls;
  }
}
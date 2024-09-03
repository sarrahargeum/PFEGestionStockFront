import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ArticleService } from '../../service/article.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../service/CategoryService';
import { MagasinService } from '../../service/magasin.service';
import { BonSortieService } from '../../service/bon-sortie.service';
import { ClientService } from '../../service/client.service';
import { BonSortieDto } from '../../modals/DTO/BonSortieDto';
import { ClientDto } from '../../modals/DTO/ClientDto';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule, FormsModule,ReactiveFormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  listArticle = [];
  listeCategorie = [];
  listeMagasin = [];
  listClient = [];
  bonSortieForm: FormGroup;
  showModal = false;
  submitted = false;
  modalTitle = 'Commander';

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategoryService,
    private magasinService: MagasinService,
    private bonSortieService: BonSortieService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.bonSortieForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      clientNom: [''],
      clientPrenom: [''],
      clientAdresse: [''],
      clientNumTel: [''],
      clientMail: [''],
      clientIdMagasin: [''],
      articleId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      dateCommande: [''],
      idMagasin: ['']
    });

    this.refreshArticleList();
    this.refreshClientList();
  }

  refreshArticleList() {
    this.articleService.getArticle().subscribe(data => {
      this.listArticle = data;
    });

    this.categorieService.getCategory().subscribe(data => {
      this.listeCategorie = data;
    });

    this.magasinService.getMagasin().subscribe(data => {
      this.listeMagasin = data;
    });
  }

  refreshClientList() {
    this.clientService.getClient().subscribe(data => {
      this.listClient = data;
    });
  }

  openModal() {
    this.submitted = false;
    this.bonSortieForm.reset();
    this.modalTitle = 'Commander';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  get bf() {
    return this.bonSortieForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.bonSortieForm.invalid) {
      return;
    }

    const formValue = this.bonSortieForm.value;

    const clientDto: ClientDto = {
      id: formValue.clientId,
      nom: formValue.clientNom,
      prenom: formValue.clientPrenom,
      adresse: formValue.clientAdresse,
      numTel: formValue.clientNumTel,
      mail: formValue.clientMail,
      idMagasin: formValue.clientIdMagasin
    };

    const bonSortieDto: BonSortieDto = {
      client: clientDto,
      ligneSorties: [{
        article: { id: formValue.articleId },
        quantite: formValue.quantite
      }],
      dateCommande: formValue.dateCommande,
      idMagasin: formValue.idMagasin
    };

    this.bonSortieService.saveBSClient(bonSortieDto).subscribe(
      response => {
        console.log('Bon de sortie saved successfully', response);
        this.closeModal();
      },
      error => {
        console.error('Error saving bon de sortie', error);
      }
    );
  }
}
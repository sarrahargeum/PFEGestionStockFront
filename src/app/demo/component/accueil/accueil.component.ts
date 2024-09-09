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
import { EtatCommande } from '../../modals/EtatCommande';

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
    if (this.bonSortieForm.invalid) {
      return;
    }

    const bonSortie = {
      code: 'BS2023-001',
      dateCommande: this.bonSortieForm.value.dateCommande,
      etatCommande: EtatCommande.EN_PREPARATIO,
      client: {
        id: this.bonSortieForm.value.clientId, // Assure-toi que l'ID du client est récupéré ici
        nom: this.bonSortieForm.value.clientNom,
        prenom: this.bonSortieForm.value.clientPrenom,
        adresse: this.bonSortieForm.value.clientAdresse,
        numTel: this.bonSortieForm.value.clientNumTel,
        mail: this.bonSortieForm.value.clientMail,
        idMagasin: this.bonSortieForm.value.clientIdMagasin
      },
      idMagasin: this.bonSortieForm.value.idMagasin,
      ligneSorties: [
        {
          article: {
            id: this.bonSortieForm.value.articleId
          },
          quantite: this.bonSortieForm.value.quantity,
        }
      ]
    };

    this.bonSortieService.saveBonSortieClient(bonSortie).subscribe(
      (response) => {
        console.log('Bon de sortie enregistré avec succès', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du bon de sortie', error);
      }
    );
  }
}
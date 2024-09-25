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
import { environment } from 'src/environments/environment';

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
  selectedArticleId:number;
  path='http://'+environment.urlBack+':8099/StockMnager/api/article/Imgarticles/'
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
 
    private bonSortieService: BonSortieService,
  ) {}

  ngOnInit(): void {
    this.bonSortieForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      clientNom: ['', Validators.required],
      clientPrenom: ['', Validators.required],
      clientAdresse: ['', Validators.required],
      clientNumTel: ['', Validators.required,],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });

    this.refreshArticleList();
  }

  refreshArticleList() {
    this.articleService.getArticle().subscribe(data => {
      this.listArticle = data;
    });

  }

 

  openModal(articleId: number): void {
    this.selectedArticleId = articleId;
    console.log('Article ID:', articleId);
    this.submitted = false;
    this.bonSortieForm.reset();
    this.modalTitle = 'Commander';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
 

    const bonSortie = {
      etatCommande: EtatCommande.EN_PREPARATIO,
      client: {
        nom: this.bonSortieForm.value.clientNom,
        prenom: this.bonSortieForm.value.clientPrenom,
        adresse: this.bonSortieForm.value.clientAdresse,
        numTel: this.bonSortieForm.value.clientNumTel,
        mail: this.bonSortieForm.value.clientMail,
       idMagasin: 1
      },
      ligneSorties: [
        {
          article: {
          id: this.selectedArticleId   
          },
          quantite: this.bonSortieForm.value.quantity,
        }
      ]
    };

    this.bonSortieService.saveBSClient(bonSortie).subscribe(
      (response) => {
        console.log('Bon de sortie enregistré avec succès', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du bon de sortie', error);
      }
    );
  }
  get f() {
    return this.bonSortieForm.controls;
  }
}
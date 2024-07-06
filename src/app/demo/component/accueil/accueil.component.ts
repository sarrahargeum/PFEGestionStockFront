import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ArticleService } from '../../service/article.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../service/CategoryService';
import { MagasinService } from '../../service/magasin.service';

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
  articleForm: FormGroup;
  selectedArticleId: number | null = null;
  showModal = false;
  submitted = false;
  modalTitle = 'Commander';

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategoryService,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      code: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      tauxTva: ['', Validators.required],
      designation: ['', Validators.required],
      categoryId: ['', Validators.required],
      magasinId: ['', Validators.required]
    });

    this.refreshArticleList();
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
  openModal(mode: 'add' , articleId?: number) {
    this.submitted = false;
/*     this.articleForm.reset();
    if (mode === 'add' && articleId != null) {
      this.modalTitle = 'Ajouter Article';
      this.isEditMode = false; 
    } */
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
   // this.articleForm.reset();
   
  }
  get f() {
    return this.articleForm.controls;
  }

  
}

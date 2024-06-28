import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/demo/modals/article';
import { CategoryService } from 'src/app/demo/service/CategoryService';
import { ArticleService } from 'src/app/demo/service/article.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DetailArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() suppressionResult = new EventEmitter();
  listeCategorie = [];
  listeMagasin = [];
  listArticle = [];
  articleForm: FormGroup;
  submitted = false;
  showModal = false;
  isEditMode = false;
  modalTitle;
  id: number | null = null;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private categorieService: CategoryService,
    private magasinService: MagasinService
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.articleForm = this.formBuilder.group({
      code: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      tauxTva: ['', Validators.required],
      designation: ['', Validators.required],
      categoryId: ['', Validators.required],
      magasinId: ['', Validators.required]
    });
  }
  fetchData() {
    this.articleService.getArticle().subscribe(data => this.listArticle = data);
    this.categorieService.getCategory().subscribe(data => this.listeCategorie = data);
    this.magasinService.getMagasin().subscribe(data => this.listeMagasin = data);
  }



  openModal(mode:'edit', articleId?: number) {
    this.submitted = false;
    
   if (mode === 'edit' && articleId != null) {
      this.modalTitle = 'Modifier Article';
      this.isEditMode = true;
      this.id = articleId;
      this.articleService.retrieveArticle(articleId).subscribe(article => {
        this.articleForm.patchValue(article);
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.articleForm.reset();
    this.isEditMode = false;
    this.id = null;
  }

  get f() {
    return this.articleForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    const formData = new FormData();
    const article = this.articleForm.value;

    formData.append('article',JSON.stringify({
      code: article.code,
      designation: article.designation,
      tauxTva: article.tauxTva,
      prix: article.prix,
      image: article.image
    }
     
    ));
    
    //formData.append('file',this.userFile);
    formData.append('categoryId', article.categoryId);
    formData.append('magasinId', article.magasinId);
  
    console.log(formData.get);
  

    if (!this.isEditMode) {
      this.articleService.ajoutArticle(formData).subscribe(() => {
        this.fetchData();
        this.closeModal();
      });
    } else if (this.id != null) {

      console.log(this.articleForm.value);

      this.articleService.updateArticle(this.id, this.articleForm.value).subscribe(() => {
        this.fetchData();
        this.closeModal();
      });
    }
  }

  deleteClick(id: number) {
    if (confirm('Are you sure to delete this article?')) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.fetchData();
      });
    }
  }
}

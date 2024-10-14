import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/demo/service/CategoryService';
import { ArticleService } from 'src/app/demo/service/article.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listarticle',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule, FormsModule,ReactiveFormsModule],
  templateUrl: './listarticle.component.html',
  styleUrl: './listarticle.component.scss'
})
export class ListarticleComponent implements OnInit {
  listArticle = [];
  listeCategorie = [];
  listeMagasin = [];
  articleForm: FormGroup;
  submitted = false;
  showModal = false;
  isEditMode = false;
  modalTitle = 'Ajouter Article';
  imgURL: any;
  id: number | null = null;
  code:string;
  userFile;
  path='http://'+environment.urlBack+':8099/StockMnager/api/article/Imgarticles/'
  dataJson:any
  datauser:any
  public imagePath;
  art;
  public message:string;
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategoryService,
    private magasinService: MagasinService,
    private toastr : ToastrService,
    private router: Router,
  ) { }

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
    this.datauser=localStorage.getItem("datauser")
    this.dataJson=JSON.parse(this.datauser)
   
  }


  refreshArticleList() {
    this.articleService.getArticle().subscribe(data => {
      this.listArticle = data;
      this.categorieService.getCategory().subscribe(categ => this.listeCategorie = categ);
      this.magasinService.getMagasin().subscribe(maga => this.listeMagasin = maga);
    });
  }
  openModal(mode: 'add' | 'edit', articleId?: number) {
    this.submitted = false;
    this.articleForm.reset();
    if (mode === 'add') {
      this.modalTitle = 'Ajouter Article';
      this.isEditMode = false;
    } else if (mode === 'edit' && articleId != null) {
      
      this.modalTitle = 'Modifier Article';
      this.isEditMode = true;
      this.id = articleId;
      this.articleService.retrieveArticle(articleId).subscribe(article => {
        this.articleForm.patchValue({
          code: article.code ,
      prix: article.prix,
      tauxTva: article.tauxTva,
      designation: article.designation,
        });
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
    
    formData.append('file',this.userFile);
    formData.append('categoryId', article.categoryId);
    formData.append('magasinId', article.magasinId);
  
  

    if (!this.isEditMode) {
      this.articleService.ajoutArticle(formData).subscribe(() => {
        this.refreshArticleList();
        this.closeModal();   this.toastr.success('Article added successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to added article. Please try again.', 'Error');
      });
    
    } else if (this.id != null) {


      this.articleService.updateArticle(this.id, this.articleForm.value).subscribe(() => {
        this.refreshArticleList();
                this.closeModal();
                this.toastr.success('Article updated successfully.', 'Success'); 
              }, error => {
                this.toastr.error('Failed to update article. Please try again.', 'Error'); 
              });
            }
   
  }
 
  onSelectFile(event) {  if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.userFile = file;
          var mineType = event.target.files[0].type;
    if(mineType.match(/image\/"/)== null){
      this.message = "only image are supported";
      return;
    }
    var reader =new FileReader();

    this.imagePath =file;
    reader.readAsDataURL(file);
    reader.onload=(event)=>{
      this.imgURL = reader.result
    }
    }
}

  deleteClick(id: number) {
    if (confirm('Are you sure to delete this article?')) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.refreshArticleList();
        this.toastr.success('article delete successfully.', 'Success');
      }, error => {
        this.toastr.error('Failed to delet article. Please try again.', 'Error');
      });
    }

 
  }

  get f() {
    return this.articleForm.controls;
  }
  viewStockDetails(articleId: number): void {
    this.router.navigate(['/detailmvtart', articleId]);
  }


  Search() {
    if (this.code != "") {
      this.listArticle = this.listArticle.filter(res => {
        return res.code.toLocaleLowerCase().match(this.code.toLocaleLowerCase());
      });
    } else if (this.code == "") {
      this.ngOnInit();
    }
  }



}
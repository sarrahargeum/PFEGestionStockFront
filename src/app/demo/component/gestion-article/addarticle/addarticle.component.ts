import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Article } from 'src/app/demo/modals/article';
import { Category } from 'src/app/demo/modals/category';
import { CategoryService } from 'src/app/demo/service/CategoryService';
import { ArticleService } from 'src/app/demo/service/article.service';

@Component({
  selector: 'app-addarticle',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './addarticle.component.html',
  styleUrl: './addarticle.component.scss'
})
export class AddarticleComponent  implements OnInit{
 
listeCategorie: Array<Category> = [];
articleForm:FormGroup;
submitted = false;
userFile;
 public imagePath;
 imgURL:any;
 public message:string;

 selectedCategoryId:number;
  constructor(
    private router: Router,
    private articleService :ArticleService,
    private categoryService : CategoryService,
    private frombuilder:FormBuilder,

  ){}

  ngOnInit(): void {
    this.categoryService.getCategory()
    .subscribe(categories => {
      this.listeCategorie = categories;
    });

    this.articleForm=this.frombuilder.group({
      code:['',Validators.required],
      designation:['',Validators.required],
      tauxTva:['',Validators.required],
      prix:['',Validators.required],
      image:['',Validators.required],
   //   id:['',Validators.required]
/* category: this.frombuilder.group({
  id: ['', Validators.required]
}),*/
 
});
     
     console.log(this.articleForm)
  }
  get f() { return this.articleForm.controls; }
 
  
  onSubmit() {
  const formData = new FormData();

  const article = this.articleForm.value;

  formData.append('article',JSON.stringify(article));
  formData.append('file',this.userFile);
 // formData.append('categoryId', this.selectedCategoryId.toString());
 

  
  this.articleService.ajoutArticle(formData).subscribe(data =>{

    this.router.navigate(['listarticle']);

  });
  }

  onSelectFile(event){
    if(event.target.files.length>0)
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

}

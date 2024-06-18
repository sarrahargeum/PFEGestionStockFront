import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/demo/service/article.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-editarticle',
  standalone: true,
  imports:  [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editarticle.component.html',
  styleUrl: './editarticle.component.scss'
})
export class EditarticleComponent implements OnInit{
  articleForm:FormGroup;
  submitted = false;
  listArticle:any;
  id;
  art;
  loading = false;


  dataJson:any
  datauser:any
  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private articleService:ArticleService,
    private UserService:UserService,
    

  ) { }

  ngOnInit(): void {
   /* this.datauser=localStorage.getItem("datauser")
    this.dataJson=JSON.parse(this.datauser)
   console.log(this.dataJson);*/

   // this.loading = true;
    this.articleForm= new FormGroup({
      code : new FormControl(null),
      designation : new FormControl(null),
      prix : new FormControl(null),
      tauxTva : new FormControl(null),


      
    })

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
         this.router.navigateByUrl('/listarticle');
      }else{
        this.id = paramMap.get('id');
        console.log('id', this.id);
        this.articleService.retrieveArticle(this.id).subscribe(res=>{
          this.art = res;
          console.log(this.art);

          this.articleForm= new FormGroup({
            code : new FormControl( this.art.code),
            designation : new FormControl(this.art.designation),
            prix : new FormControl(this.art.prix),
            tauxTva : new FormControl(this.art.tauxTva),
           
          });
          console.log(this.articleForm.value);

          this.loading = false;
        

        })
      }
    })
   /* this.categoryService.getCategory().subscribe(data=>{
      this.listCategory=data;
      console.log(this.listCategory);
    });*/
  
  }

  save(){
    this.articleService.updateArticle(this.id,this.articleForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/listarticle');
          }
    );
   
  }

  onReset() {
    this.submitted = false;
    this.articleForm.reset();
  }
}

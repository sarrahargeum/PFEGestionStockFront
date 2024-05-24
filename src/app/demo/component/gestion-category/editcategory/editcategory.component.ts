import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/demo/service/CategoryService';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.scss'
})
export class EditcategoryComponent implements OnInit{
  categoryForm:FormGroup;
  submitted = false;
  listCategory:any;
  id;
  cat;
  loading = false;


  dataJson:any
  datauser:any
  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private categoryService:CategoryService,
    private UserService:UserService,
    

  ) { }

  ngOnInit(): void {
    this.datauser=localStorage.getItem("datauser")
    this.dataJson=JSON.parse(this.datauser)
   console.log(this.dataJson);

    this.loading = true;
    this.categoryForm= new FormGroup({
      code : new FormControl(null),
      designation : new FormControl(null),
      
    })

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
         this.router.navigateByUrl('/listcategory');
      }else{
        this.id = paramMap.get('id');
        console.log('id', this.id);
        this.categoryService.retrieveCategory(this.id).subscribe(res=>{
          this.cat = res;
          console.log(this.cat);

          this.categoryForm= new FormGroup({
            code : new FormControl( this.cat.code),
            designation : new FormControl(this.cat.designation),
           
          });
          console.log(this.categoryForm.value);

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
    this.categoryService.updateCategory(this.id,this.categoryForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/listcategory');
          }
    );
   
  }

  onReset() {
    this.submitted = false;
    this.categoryForm.reset();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Category } from 'src/app/demo/modals/category';
import { CategoryService } from 'src/app/demo/service/CategoryService';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss'
})
export class AddcategoryComponent implements OnInit{

  categoryForm:FormGroup;
  submitted = false;
  listCategory:any;

  constructor(
    private categoryService:CategoryService,
    private router:Router,
    private frombuilder:FormBuilder,
  ){}

  ngOnInit():void{
   this.categoryForm=this.frombuilder.group({
    code:['',Validators.required],
    designation:['',Validators.required],
   })

  }
  get f() { return this.categoryForm.controls; }

  save(){
    this.submitted = true;
    console.log(this.categoryForm.value);

    if (this.categoryForm.invalid) {
        
      return;
  } else{
    console.log("dddddd");
  this.categoryService.postCategory(this.categoryForm.value).subscribe(resultat=>{
   
    
console.log(resultat);

    if(resultat){
      this.router.navigate(['listcategory'])
      console.log("resultat",resultat)
   }
   
  })

  }
  }
  
  onReset() {
    this.submitted = false;
    this.categoryForm.reset();
  }
}

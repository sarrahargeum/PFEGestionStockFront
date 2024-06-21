import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MagasinService } from 'src/app/demo/service/magasin.service';

@Component({
  selector: 'app-addmagasin',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './addmagasin.component.html',
  styleUrl: './addmagasin.component.scss'
})
export class AddmagasinComponent implements OnInit{

  magasinForm:FormGroup;
  submitted = false;
  listmagasin:any;

  constructor(
    private magasinService:MagasinService,
    private router:Router,
    private frombuilder:FormBuilder,
  ){}

  ngOnInit():void{
   this.magasinForm=this.frombuilder.group({
    nom:['',Validators.required],
    description:['',Validators.required],
    email:['',Validators.required],
    numTel:['',Validators.required],
   })

  }
  get f() { return this.magasinForm.controls; }

  save(){
    this.submitted = true;
    console.log(this.magasinForm.value);

    if (this.magasinForm.invalid) {
        
      return;
  } else{
    console.log("dddddd");
  this.magasinService.postMagasin(this.magasinForm.value).subscribe(resultat=>{
   
    
console.log(resultat);

    if(resultat){
      this.router.navigate(['listmagasin'])
      console.log("resultat",resultat)
   }
   
  })

  }
  }
  
  onReset() {
    this.submitted = false;
    this.magasinForm.reset();
  }
}

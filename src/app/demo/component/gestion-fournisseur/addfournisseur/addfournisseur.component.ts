import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Magasin } from 'src/app/demo/modals/magasin';
import { FournisseurService } from 'src/app/demo/service/fournisseur.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';

@Component({
  selector: 'app-addfournisseur',
  standalone: true,
  imports:  [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './addfournisseur.component.html',
  styleUrl: './addfournisseur.component.scss'
})
export class AddfournisseurComponent implements OnInit{


  fourForm:FormGroup;
  submitted = false;
  listfourni:any;
  
  listeMagasin:Array<Magasin> =[];

  constructor(
    private fournisseurService:FournisseurService,
    private router:Router,
    private frombuilder:FormBuilder,
    private magasinService : MagasinService,


  ){}

  ngOnInit():void{

    this.magasinService.getMagasin()
    .subscribe(magasines => {
      this.listeMagasin = magasines;
    });

   this.fourForm=this.frombuilder.group({
    nom:['',Validators.required],
    prenom:['',Validators.required],
    adresse: ['',Validators.required],
    magasinId:['', Validators.required],

   })

  }
  get f() { return this.fourForm.controls; }

  save(){      
       this.submitted = true;
    const fourForm = {
     nom: this.f.nom.value,
     prenom: this.f.prenom.value,
     adresse: this.f.adresse.value,
     
     magasin: {
       id: this.f.magasinId.value

     }
   };
     this.fournisseurService.postFournisseur(fourForm).subscribe(data=>{ 
     this.router.navigate(['/listfournisseur'])
})
   }
   
  
  
  onReset() {
    this.submitted = false;
    this.fourForm.reset();
  }
}

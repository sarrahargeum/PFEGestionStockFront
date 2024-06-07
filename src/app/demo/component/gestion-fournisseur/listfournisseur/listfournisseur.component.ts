import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Fournisseur } from 'src/app/demo/modals/fournisseur';
import { FournisseurService } from 'src/app/demo/service/fournisseur.service';

@Component({
  selector: 'app-listfournisseur',
  standalone: true,
  imports:  [CommonModule,RouterModule,FormsModule],
  templateUrl: './listfournisseur.component.html',
  styleUrl: './listfournisseur.component.scss'
})
export class ListfournisseurComponent implements OnInit {

  listfournisseur: Fournisseur[];

   constructor(private fourniseurService:FournisseurService){}
 
   ngOnInit():void{
     this.fourniseurService.getFournisseur().subscribe(
       (data:Fournisseur[]) => this.listfournisseur = data);
       
 
   }
   
   refrechFourList() {
     this.fourniseurService.getFournisseur().subscribe(data => {
       this.listfournisseur = data;
       let arr = this.listfournisseur;
       console.log(this.listfournisseur);
     });
 
   }
 
   deleteClick(id) {
     if (confirm('Are you sure to delete this project')) {
       this.fourniseurService.deletefourniseur(id).subscribe(data => {
 
         this.refrechFourList();
       })
     }
   }
 
 }
 
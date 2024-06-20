import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Magasin } from 'src/app/demo/modals/magasin';
import { MagasinService } from 'src/app/demo/service/magasin.service';

@Component({
  selector: 'app-listmagasin',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule, FormsModule],
  templateUrl: './listmagasin.component.html',
  styleUrl: './listmagasin.component.scss'
})
export class ListmagasinComponent implements OnInit {
  listMagasin: Magasin[];
  nom:string= '';
 
 
   constructor(private magasinService:MagasinService){}
 
   ngOnInit():void{
     this.magasinService.getMagasin().subscribe(
       (data:Magasin[]) => this.listMagasin = data);
 
   }
   refrechMgList() {
     this.magasinService.getMagasin().subscribe(data => {
       this.listMagasin = data;
       let arr = this.listMagasin;
       console.log(this.listMagasin);
     });
 
   }
 
   deleteClick(id) {
     if (confirm('Are you sure to delete this project')) {
       this.magasinService.deleteMagasin(id).subscribe(data => {
 
         this.refrechMgList();
       })
     }
   }
 
   Search() {
     if (this.nom != "") {
       this.listMagasin = this.listMagasin.filter(res => {
         return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
       });
     } else if (this.nom == "") {
       this.ngOnInit();
     }
   }
 
 }
 
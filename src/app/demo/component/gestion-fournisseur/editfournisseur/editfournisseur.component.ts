import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Magasin } from 'src/app/demo/modals/magasin';
import { FournisseurService } from 'src/app/demo/service/fournisseur.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-editfournisseur',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editfournisseur.component.html',
  styleUrl: './editfournisseur.component.scss'
})
export class EditfournisseurComponent implements OnInit{
  fourForm:FormGroup;
  submitted = false;
  listFour:any;
  id;
  four;
  loading = false;
  listeMagasins:Array<Magasin>=[];


  dataJson:any
  datauser:any
  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private fournisseurService:FournisseurService,
    private UserService:UserService,
    private magasinService: MagasinService

    

  ) { }

  ngOnInit(): void {
    
  this.magasinService.getMagasin()
  .subscribe(magasins => {
    this.listeMagasins = magasins;})

    
    this.datauser=localStorage.getItem("datauser")
    this.dataJson=JSON.parse(this.datauser)
   console.log(this.dataJson);

    this.loading = true;
    this.fourForm= new FormGroup({
      nom : new FormControl(null),
      prenom : new FormControl(null),
      adresse : new FormControl(null),
      
    })

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
         this.router.navigateByUrl('/listfournisseur');
      }else{
        this.id = paramMap.get('id');
        console.log('id', this.id);
        this.fournisseurService.retrieveFournisseur(this.id).subscribe(res=>{
          this.four = res;
          console.log(this.four);

          this.fourForm= new FormGroup({
            nom : new FormControl( this.four.nom),
            prenom : new FormControl(this.four.prenom),
            adresse : new FormControl(this.four.adresse),

           
          });
          console.log(this.fourForm.value);

          this.loading = false;
        

        })
      }
    })
   
  }

  save(){
    this.fournisseurService.updateFournisseur(this.id,this.fourForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/listfournisseur');
          }
    );
   
  }

  onReset() {
    this.submitted = false;
    this.fourForm.reset();
  }
}


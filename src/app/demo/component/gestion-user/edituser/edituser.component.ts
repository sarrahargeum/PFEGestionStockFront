import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Magasin } from 'src/app/demo/modals/magasin';
import { Roles } from 'src/app/demo/modals/roles';
import { MagasinService } from 'src/app/demo/service/magasin.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss'
})
export class EdituserComponent implements OnInit{
  user;
  id;
  loading = false;
  submitted = false;
  form: any;
datauser:any;
listeMagasins:Array<Magasin>=[];

constructor(
  private activatedRoute : ActivatedRoute,
  private router: Router,
  private userService :UserService ,
  private magasinService: MagasinService


) { }
ngOnInit(): void {

  this.magasinService.getMagasin()
      .subscribe(magasins => {
        this.listeMagasins = magasins;})

  this.datauser=JSON.parse(localStorage.getItem("datauser"))
   this.loading = true;
   this.form= new FormGroup({
    firstname : new FormControl(null),
    lastname : new FormControl(null),
    email : new FormControl(null),
    role: new FormControl(null),
    magasin: new FormControl(null),
    
   })

   this.activatedRoute.paramMap.subscribe(paramMap=>{
     if(!paramMap.has('id')){
        this.router.navigateByUrl('/listuser');
     }else{
       this.id = paramMap.get('id');
       console.log('id', this.id);
       this.userService.retrieveUser(this.id).subscribe(res=>{
         this.user = res;
         console.log(this.user);

         this.form= new FormGroup({
          firstname : new FormControl( this.user.firstname),
          lastname : new FormControl(this.user.lastname),
          email : new FormControl(this.user.email),
          role: new FormControl(this.user.role),
          magasin: new FormControl(this.user.magasin),      
         });

         this.loading = false;


       })
     }
   })
 }
 get f() { return this.form.controls; }

 save(){
  this.userService.updateUser(this.id, this.form.value).subscribe(
    ()=>{
     
      this.router.navigateByUrl('/listuser');
    }
  );
}


}

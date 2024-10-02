import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-profil',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './gestion-profil.component.html',
  styleUrl: './gestion-profil.component.scss'
})
export class GestionProfilComponent implements OnInit{
  user;
  id;
  loading = false;
  submitted = false;
  form: any;
datauser:any;
dataJson:any;

constructor(
  private activatedRoute : ActivatedRoute,
  private router: Router,
  private userService :UserService ,
  private toastr :ToastrService


) { }
ngOnInit(): void {



  this.datauser=JSON.parse(localStorage.getItem("datauser"))
   this.loading = true;
   this.form= new FormGroup({
    firstname : new FormControl(null),
    lastname : new FormControl(null),
    email : new FormControl(null),

    
   })

   this.activatedRoute.paramMap.subscribe(paramMap=>{
     if(!paramMap.has('id')){
        this.router.navigateByUrl('/listuser');
     }else{
       this.id = paramMap.get('id');
       this.userService.retrieveUser(this.id).subscribe(res=>{
         this.user = res;

         this.form= new FormGroup({
          firstname : new FormControl( this.user.firstname),
          lastname : new FormControl(this.user.lastname),
          email : new FormControl(this.user.email),
        
         
         });

         this.loading = false;


       })
     }
   })
 }
 get f() { return this.form.controls; }

 save(){
  this.userService.updateUser(this.id, this.form.value).subscribe(
    (res:any)=>{
     
      this.datauser.user=res
      localStorage.setItem('datauser', JSON.stringify(this.datauser));
      this.router.navigateByUrl('/listuser');
      setTimeout(() => {
        location.reload();
      }, 50);
      this.toastr.success('User update successfully.', 'Success'); 
    }, error => {
      this.toastr.error('Failed to update user. Please try again.', 'Error'); 
    }
    
  );
}


}

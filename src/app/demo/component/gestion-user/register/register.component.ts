// angular import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication.service';
import { CommonModule } from '@angular/common';
import { Roles } from '../../../modals/roles';
import { Magasin } from '../../../modals/magasin';
import { MagasinService } from '../../../service/magasin.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  utilisateurForm: FormGroup;
  submitted = false;
  //selectedFonction: any; 
  registerForm: FormGroup;
  listeMagasins:Array<Magasin>=[];
listeRoles: Array<Roles> = [];
 
  constructor(
    private router: Router,
    private AuthenticationService:AuthenticationService,
    private formbuilder: FormBuilder,
    private magasinService: MagasinService
    ) { }

  ngOnInit(): void {

     /* this.AuthenticationService.getRoles()
      .subscribe(roles => {
        this.listeRoles = roles;
       
  });*/
    this.magasinService.getMagasin()
      .subscribe(magasins => {
        this.listeMagasins = magasins;
        
  });


    this.registerForm=this.formbuilder.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      roleId:['', Validators.required],
      magasinId:['', Validators.required],
   

    })
  // console.log(this.registerForm);
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

    onSubmit() {
         this.submitted = true;
         const formData = {
          firstname: this.f.firstname.value,
          lastname: this.f.lastname.value,
          email: this.f.email.value,
          password: this.f.password.value,
          magasins: {
            id: this.f.magasinId.value
          },
          roles: {
            id: this.f.roleId.value
          }
        };
          this.AuthenticationService.register(formData).subscribe(data=>{ 
          this.router.navigate(['/listuser'])
})

}  

    onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}



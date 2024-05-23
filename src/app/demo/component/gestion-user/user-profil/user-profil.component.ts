import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  utilisateurForm: FormGroup;
  submitted = false;
  //selectedFonction: any; 
  ProfilForm: FormGroup;
 
  constructor(
    private router: Router,

    private formbuilder: FormBuilder
    ) { }

  ngOnInit(): void {

  //  console.log(this.progFonc);

    this.ProfilForm=this.formbuilder.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
     
      password:['', [Validators.required, Validators.minLength(6)]],
     // role:['', Validators.required],
   

    })
    console.log(this.ProfilForm);
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.ProfilForm.controls; }

}

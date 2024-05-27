// angular import
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private isLoggedIn = false;
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authenticationService : AuthenticationService) { }


  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email:[''],
      password:[''],
 

    })
  }
    onSubmit() {
      const val = this.loginForm.value;        
      if (val.email && val.password) {
          this.authenticationService.authenticate(val)
              .subscribe(
                  (data:any) => {
                      console.log("User is logged in");
                      localStorage.setItem('datauser',JSON.stringify(data))
                      this.router.navigate(['/listarticle']);
                      
                  }
              );
      }
  }
}

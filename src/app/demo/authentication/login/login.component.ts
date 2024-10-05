// angular import
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

import { AuthenticationRequest } from '../../modals/AuthenticationRequest';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private isLoggedIn = false;
  loginForm: FormGroup;
  submitted = false;

  authenticationRequest: AuthenticationRequest = {};
  errorMessage = '';
  datauser:any;

  

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authenticationService : AuthenticationService) { }


  ngOnInit(): void {

   this.datauser=JSON.parse(localStorage.getItem("datauser"))

  }
  onSubmit() {
    this.authenticationService.authenticate(this.authenticationRequest).subscribe(
      (data) => {
        localStorage.setItem('datauser', JSON.stringify(data));

        if (data.roles.id === 1) {
          this.router.navigate(['listarticle']);
        } else if (data.roles.id === 2) {
          this.router.navigate(['listarticle']);
        } else if (data.roles.id === 3) {
          this.router.navigate(['dashboard/default']);
        } else {
          alert(data.errorMessage || 'Unknown role');
        }
      },
      (error) => {
        console.error('Authentication error:', error);
        this.errorMessage = 'Incorrect email or password';
      }
    );
  }
}
// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  datauser:any
  nameuser:string
  constructor(private router: Router) {}

  // public method
  profile = [
   /* {
      icon: 'ti ti-edit-circle',
      title: 'Edit Profile',
      routerLink: '/edituser/{{user.id}}'
    },*/
 
  ];

 ngOnInit(){
  this.datauser=JSON.parse(localStorage.getItem("datauser"))
  this.nameuser=this.datauser.user.firstname+' '+this.datauser.user.lastname
  
  
 }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  goToProfil(){
    this.router.navigate(['gestion-profil/'+this.datauser.user.id])
    
  }

  LogOut(){
    this.router.navigate(['login'])
    localStorage.clear();
  }
}

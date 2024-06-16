// angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(private router: Router) {}

  // public method
  profile = [
   /* {
      icon: 'ti ti-edit-circle',
      title: 'Edit Profile',
      routerLink: '/edituser/{{user.id}}'
    },*/
 
  ];

 
  navigateTo(route: string) {
    this.router.navigate([route]);
  }


  LogOut(){
    console.log("test");
    this.router.navigate(['login'])
    localStorage.clear();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/demo/modals/user';
import { RoleService } from 'src/app/demo/service/role.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.scss'
})
export class ListuserComponent implements OnInit {
  listUser: User[];
  listRole :any=[];

  firstname:string= '';

   constructor(private userService:UserService,
   private roleService:RoleService

   ){}

  ngOnInit():void{
    this.refrechUserList();
    this.findAllRole();
  }
  
  refrechUserList() {
    this.userService.getUser().subscribe(data => {
      this.listUser = data;
      console.log(this.listUser);
    });
}


findAllRole(){ 
  this.roleService.findAllRole().subscribe(data=>{
  this.listRole=data;
 });
 };

deleteClick(id) {
  if (confirm('Are you sure to delete this user')) {
    this.userService.deleteUser(id).subscribe(data => {

      this.refrechUserList();
    })
  }
}

toggleActivation(user: any) {
  const newStatus = !user.activated;
  this.userService.active(user.id, newStatus).subscribe(response => {
    // Mettez à jour l'état de l'utilisateur dans l'interface utilisateur
    user.activated = newStatus;
  }, error => {
    console.error('Erreur lors de la mise à jour de l\'activation', error);
  });
}


Search() {
  if (this.firstname != "") {
    this.listUser = this.listUser.filter(res => {
      return res.firstname.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
    });
  } else if (this.firstname == "") {
    this.ngOnInit();
  }
}

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/demo/modals/user';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { MagasinService } from 'src/app/demo/service/magasin.service';
import { RoleService } from 'src/app/demo/service/role.service';
import { UserService } from 'src/app/demo/service/user.service';
import { WebSocketService } from 'src/app/demo/service/web-Socket.service';

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.scss'
})
export class ListuserComponent  implements OnInit {
  listUser: any[] = [];
  listeMagasins: any[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  userForm: FormGroup;
  firstname: string;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private magasinService: MagasinService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private socketService : WebSocketService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: [null, Validators.required],
      magasinId: [null, Validators.required],
    
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadMagasins();
    //lpartie hedhi hia eli test7a9ha bech touslek notif 
/*fil connect t3adi role es7i7 ahna 3emlin condition ken 3adit chef tjih les notif de validation
    w ken 7atit admin tjih les notif ki stock mch youfa wadh7a hedhi ? ey ey wadhha maaneha vhef heki twali chef Magasin kima andi ena RoleService
    exactement juste ken 7atit lesm si nn id lfeyda test tab9a te5dem ma3neha tnajem tbadel fil service zeda */
  /*  this.socketService.connect("ChefMagasin");

    // Subscribe to incoming messages
     this.socketService.getMessages().subscribe((message) => {
      console.log(message);
    });*/
  }

  loadUsers() {
    this.userService.getUser().subscribe(users => {
      this.listUser = users;
    });
  }

  loadMagasins() {
    this.magasinService.getMagasin().subscribe(magasins => {
      this.listeMagasins = magasins;
    });
  }

  openModal(mode: string, userId?: number) {

    this.showModal = true;
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && userId) {
      this.id = userId;
      this.userService.retrieveUser(userId).subscribe(user => {
        this.userForm.patchValue(user);
        this.userForm.controls['password'].clearValidators();
        this.userForm.controls['password'].updateValueAndValidity();
      });
    } else {
      this.id = null;
      this.userForm.reset();
      //this.userForm.controls['activated'].setValue(1);
    }
  }

  closeModal() {
    this.showModal = false;
  }

  toggleActivation(user: any) {
    const newStatus = !user.activated;
    this.userService.active(user.id, newStatus).subscribe(response => {
      user.activated = newStatus;
    }, error => {
      console.error('Error toggling activation status', error);
    });
  }

  deleteClick(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
      this.toastr.success('User deleted successfully.', 'Success'); 
    }, error => {
      this.toastr.error('Failed to delete user. Please try again.', 'Error'); 
    });
  }

  get f() { return this.userForm.controls; }
  onSubmit() {
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
    if (this.isEditMode && this.id !== null) {
      this.userService.updateUser(this.id, this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.closeModal();
        this.toastr.success('User update successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to update user. Please try again.', 'Error');   
      });
    } else {
      

      this.authenticationService.register(formData).subscribe(() => {
        this.loadUsers();
        this.closeModal();
        this.toastr.success('User added successfully.', 'Success'); 
      }, error => {
        this.toastr.error('Failed to added user. Please try again.', 'Error');      
      });
    }
  }

  Search() {
    if (this.firstname) {
      this.listUser = this.listUser.filter(user => {
        return user.firstname.toLowerCase().includes(this.firstname.toLowerCase());
      });
    } else {
      this.loadUsers();
    }
  }
}
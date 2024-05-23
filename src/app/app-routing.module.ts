// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AddarticleComponent } from './demo/component/gestion-article/addarticle/addarticle.component';
import { ListarticleComponent } from './demo/component/gestion-article/listarticle/listarticle.component';
import DashboardComponent from './demo/default/dashboard/dashboard.component';
import { UserProfilComponent } from './demo/component/gestion-user/user-profil/user-profil.component';
import { ListcategoryComponent } from './demo/component/gestion-category/listcategory/listcategory.component';
import { AddcategoryComponent } from './demo/component/gestion-category/addcategory/addcategory.component';
import { LoginComponent } from './demo/authentication/login/login.component';
import RegisterComponent from './demo/component/gestion-user/register/register.component';
import { ListuserComponent } from './demo/component/gestion-user/listuser/listuser.component';
import { EdituserComponent } from './demo/component/gestion-user/edituser/edituser.component';
import { EditcategoryComponent } from './demo/component/gestion-category/editcategory/editcategory.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      { path: 'login', component:LoginComponent },
      { path: 'register',component:RegisterComponent },
   ]
  },
  {
    path: '',
    component: AdminComponent,
     
    children: [
      
      { path: 'dashboard/default', component:DashboardComponent },
      { path: 'user-profil',component:UserProfilComponent},
      { path:'listarticle', component:ListarticleComponent},
      { path: 'addarticle', component: AddarticleComponent },
      { path: 'listcategory',component:ListcategoryComponent},
      { path: 'addcategory', component:AddcategoryComponent  },
      { path: 'editcategory/:id', component:EditcategoryComponent  },
      { path:'listuser', component:ListuserComponent},
      { path: 'edituser/:id', component: EdituserComponent }
      
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

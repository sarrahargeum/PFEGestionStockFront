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
import { AccueilComponent } from './demo/component/accueil/accueil.component';
import { ApplicationGuardService } from './demo/service/guard/application-guard.service';

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
      { path: 'register',component:RegisterComponent ,canActivate:[ ApplicationGuardService]},
      {path: 'accueil', component:AccueilComponent}
   ]
  },
  {
    path: '',
    component: AdminComponent,
     
    children: [
      
      { path: 'dashboard/default', component:DashboardComponent, canActivate:[ ApplicationGuardService] },
      { path: 'user-profil',component:UserProfilComponent ,canActivate:[ ApplicationGuardService]},
      { path:'listarticle', component:ListarticleComponent,canActivate:[ ApplicationGuardService]},
      { path: 'addarticle', component: AddarticleComponent ,canActivate:[ ApplicationGuardService]},
      { path: 'listcategory',component:ListcategoryComponent,canActivate:[ ApplicationGuardService]},
      { path: 'addcategory', component:AddcategoryComponent ,canActivate:[ ApplicationGuardService] },
      { path: 'editcategory/:id', component:EditcategoryComponent ,canActivate:[ ApplicationGuardService] },
      { path:'listuser', component:ListuserComponent, canActivate:[ ApplicationGuardService]},
      { path: 'edituser/:id', component: EdituserComponent ,canActivate:[ ApplicationGuardService]}
      
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

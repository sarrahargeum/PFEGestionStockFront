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
import { AddfournisseurComponent } from './demo/component/gestion-fournisseur/addfournisseur/addfournisseur.component';
import { ListfournisseurComponent } from './demo/component/gestion-fournisseur/listfournisseur/listfournisseur.component';
import { EditfournisseurComponent } from './demo/component/gestion-fournisseur/editfournisseur/editfournisseur.component';
import { GestionArticleComponent } from './demo/component/gestion-article/gestion-article.component';
import { GestionCategoryComponent } from './demo/component/gestion-category/gestion-category.component';
import { GestionUserComponent } from './demo/component/gestion-user/gestion-user.component';
import { GestionFournisseurComponent } from './demo/component/gestion-fournisseur/gestion-fournisseur.component';

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

    ///  { path:'gestion-article', component:GestionArticleComponent,canActivate:[ ApplicationGuardService]},
      { path:'listarticle', component:ListarticleComponent,canActivate:[ ApplicationGuardService]},
      { path: 'addarticle', component: AddarticleComponent ,canActivate:[ ApplicationGuardService]},

    //  { path:'gestion-category', component:GestionCategoryComponent,canActivate:[ ApplicationGuardService]},
      { path: 'listcategory',component:ListcategoryComponent,canActivate:[ ApplicationGuardService]},
      { path: 'addcategory', component:AddcategoryComponent ,canActivate:[ ApplicationGuardService] },
      { path: 'editcategory/:id', component:EditcategoryComponent ,canActivate:[ ApplicationGuardService] },

      ///{ path:'gestion-user', component:GestionUserComponent,canActivate:[ ApplicationGuardService]},
      { path:'listuser', component:ListuserComponent, canActivate:[ ApplicationGuardService]},
      { path: 'edituser/:id', component: EdituserComponent ,canActivate:[ ApplicationGuardService]},

    //  { path:'gestion-fournisseur', component:GestionFournisseurComponent,canActivate:[ ApplicationGuardService]},
      { path: 'addfournisseur', component:AddfournisseurComponent  ,canActivate:[ ApplicationGuardService]},
      { path: 'listfournisseur', component:ListfournisseurComponent  ,canActivate:[ ApplicationGuardService]},
      { path: 'editfournisseur/:id', component: EditfournisseurComponent ,canActivate:[ ApplicationGuardService]},

      
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { ListarticleComponent } from './demo/component/gestion-article/listarticle/listarticle.component';
import DashboardComponent from './demo/default/dashboard/dashboard.component';
import { ListcategoryComponent } from './demo/component/gestion-category/listcategory/listcategory.component';
import { LoginComponent } from './demo/authentication/login/login.component';

import { AccueilComponent } from './demo/component/accueil/accueil.component';
import { ApplicationGuardService } from './demo/service/guard/application-guard.service';
import { ListfournisseurComponent } from './demo/component/gestion-fournisseur/listfournisseur/listfournisseur.component';


import { GestionProfilComponent } from './demo/component/gestion-profil/gestion-profil.component';
import { ListmagasinComponent } from './demo/component/gestion-magasin/listmagasin/listmagasin.component';
import { ListuserComponent } from './demo/component/gestion-user/listuser/listuser.component';
import { MvtStockComponent } from './demo/component/gestion-article/mvt-stock/mvt-stock.component';
import { DetailArticleComponent } from './demo/component/gestion-article/detail-article/detailArticleComponent';
import { BonEntreeComponent } from './demo/component/bon-livraison/bon-entree/bon-entree.component';
import { BonSortieComponent } from './demo/component/bon-livraison/bon-sortie/bon-sortie.component';
import { DetailBonEntreeComponent } from './demo/component/bon-livraison/detail-bon-entree/detail-bon-entree.component';
import { AddBonEntreeComponent } from './demo/component/bon-livraison/add-bon-entree/add-bon-entree.component';

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
      {path: 'accueil', component:AccueilComponent}
   ]
  },
  {
    path: '',
    component: AdminComponent,
     
    children: [
      
      { path: 'gestion-profil/:id', component: GestionProfilComponent },

      { path: 'dashboard/default', component:DashboardComponent, canActivate:[ ApplicationGuardService] },

    ///  gestion-article
      { path:'listarticle', component:ListarticleComponent,canActivate:[ ApplicationGuardService]},
      { path:"detailArticle", component:DetailArticleComponent , canActivate:[ApplicationGuardService]},

    // category
      { path: 'listcategory',component:ListcategoryComponent,canActivate:[ ApplicationGuardService]},
     

      ///user
      { path:'listuser', component:ListuserComponent, canActivate:[ ApplicationGuardService]},
      

    //  fournisseur
      { path: 'listfournisseur', component:ListfournisseurComponent  ,canActivate:[ ApplicationGuardService]},

      ///Magasin
      { path: 'listmagasin', component:ListmagasinComponent  ,canActivate:[ ApplicationGuardService]},


      {path:'mvtStock', component:MvtStockComponent , canActivate:[ApplicationGuardService]},


      {path:'bonEntree', component:BonEntreeComponent , canActivate:[ApplicationGuardService]},
      {path:'bonSortie', component:BonSortieComponent , canActivate:[ApplicationGuardService]},

      {path:'addBonEntree', component:AddBonEntreeComponent , canActivate:[ApplicationGuardService]},

      {path:'detailBonEntree', component:DetailBonEntreeComponent , canActivate:[ApplicationGuardService]},



    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

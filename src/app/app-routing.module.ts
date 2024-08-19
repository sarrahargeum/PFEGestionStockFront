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
import { MvtStockComponent } from './demo/component/mvt-stock/mvt-stock.component';
import { DetailArticleComponent } from './demo/component/gestion-article/detail-article/detailArticleComponent';
import { NouvelleCmdCltFrsComponent } from './demo/component/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs.component';
import { DetailCmdComponent } from './demo/component/detail-cmd/detail-cmd.component';
import { PageCmdCltFrsComponent } from './demo/component/page-cmd-clt-frs/page-cmd-clt-frs.component';

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


      {path:'detailCmd', component:DetailCmdComponent , canActivate:[ApplicationGuardService]},


      {
        path: 'nouvellecommandeclt',
        component: NouvelleCmdCltFrsComponent,
      canActivate: [ApplicationGuardService],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'commandesclient',
        component: PageCmdCltFrsComponent,
        canActivate: [ApplicationGuardService],
        data: {
          origin: 'client'
        },
      },

      {
        path: 'nouvellecommandefrs',
        component: NouvelleCmdCltFrsComponent,
        canActivate: [ApplicationGuardService],
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'commandesfournisseur',
        component: PageCmdCltFrsComponent,
        canActivate: [ApplicationGuardService],
        data: {
          origin: 'fournisseur'
        },
      },
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

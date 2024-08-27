// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { NavigationComponent } from './theme/layouts/admin/navigation/navigation.component';
import { NavBarComponent } from './theme/layouts/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layouts/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layouts/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layouts/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layouts/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layouts/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layouts/admin/navigation/nav-content/nav-item/nav-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './demo/service/authentication.service';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { DetailArticleComponent } from './demo/component/gestion-article/detail-article/detailArticleComponent';
import { MvtStockComponent } from './demo/component/mvt-stock/mvt-stock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSocketService } from './demo/service/web-Socket.service';
import { NouvelleCmdCltFrsComponent } from './demo/component/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs.component';
import { DetailCmdComponent } from './demo/component/detail-cmd/detail-cmd.component';
import { PageCmdCltFrsComponent } from './demo/component/page-cmd-clt-frs/page-cmd-clt-frs.component';
import { DetailCmdCltFrsComponent } from './demo/component/detail-cmd-clt-frs/detail-cmd-clt-frs.component';
import { BouttonActionComponent } from './demo/component/boutton-action/boutton-action.component';
import { DetailMvtStkComponent } from './demo/component/detail-mvt-stk/detail-mvt-stk.component';
import { DetailMvtStkArticleComponent } from './demo/component/detail-mvt-stk-article/detail-mvt-stk-article.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    NavigationComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent ,
    DetailArticleComponent,
    MvtStockComponent ,
    NouvelleCmdCltFrsComponent,
    DetailCmdComponent,
    PageCmdCltFrsComponent,
    DetailCmdCltFrsComponent,
    BouttonActionComponent,
    DetailMvtStkComponent,
    DetailMvtStkArticleComponent


  
   
  ],
  imports: [BrowserModule, AppRoutingModule,SharedModule, BrowserAnimationsModule ,CommonModule,
    FormsModule,ReactiveFormsModule, HttpClientModule,DialogModule,RouterModule, NgbModule,
    ToastrModule.forRoot(), // ToastrModule added

    

  ],
    providers: [
      AuthenticationService,
      WebSocketService,
      provideToastr(), // Toastr providers

    ],
   
  bootstrap: [AppComponent]
})

export class AppModule {}

// Angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import packageJson from 'package.json';
// project import
import { Admin, ChefMagasin, Magasinier } from '../navigation';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  version: string = (packageJson as any).version;
  infoUser:any=null
  public listTitles: any[];
  public isCollapsed = true;
  datauser;
  dataJson;

  // public props
  @Output() NavCollapsedMob: EventEmitter<string> = new EventEmitter();

  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  
  windowWidth = window.innerWidth;

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private router: Router
  ) {}

  ngOnInit() {

    this.datauser=localStorage.getItem("datauser")
    this.dataJson=JSON.parse(this.datauser)

   
    this.infoUser=JSON.parse(localStorage.getItem("datauser"))
       if(this.infoUser?.roles.id==1){
   
      this.listTitles = ChefMagasin.filter(listTitle =>
        listTitle
      );
    }else if(this.infoUser?.roles.id==2){
      this.listTitles = Magasinier.filter(listTitle =>
        listTitle
      );
    }
    else if(this.infoUser?.roles.id==3){
      this.listTitles = Admin.filter(listTitle =>
        listTitle
      );
    }
    
  

    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }
}

// angular import
import { Component } from '@angular/core';
import packageJson from 'package.json';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  version: string = (packageJson as any).version;
  // public props
  navCollapsed: boolean;
  navCollapsedMob: boolean = false;

  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}

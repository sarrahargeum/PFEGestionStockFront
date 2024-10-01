// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/demo/service/notification.service';
import { WebSocketService } from 'src/app/demo/service/web-Socket.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  datauser:any
  nameuser:string
  notifications: any = [];

  constructor(private router: Router,
    private socketService : WebSocketService,
    private notificationService: NotificationService
  ) {}
  // public method
  profile = [];

 ngOnInit(){
  this.datauser=JSON.parse(localStorage.getItem("datauser"))
  this.nameuser=this.datauser.user.firstname+' '+this.datauser.user.lastname
//notif
  this.socketService.connect(this.datauser.roles.nomRole);

  // Subscribe to incoming messages
   this.socketService.getMessages().subscribe((message) => {
    if (this.datauser.roles.nomRole === 'ChefMagasin') {
      this.loadNotificationsByType('Validation'); 
    } else if (this.datauser.roles.nomRole === 'admin') { 
      this.loadNotificationsByType('OutOfStock'); 
    }    if(message){
      this.notifications?.push(message);
    }   
  });

 
 }

 loadNotificationsByType(type: string): void {
  this.notificationService.getNotificationsByType(type).subscribe(
      (data: Notification[]) => {
          this.notifications = data; 
      },
      (error) => {
          console.error('Failed to load notifications', error);
      }
  );
}
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  goToProfil(){
    this.router.navigate(['gestion-profil/'+this.datauser.user.id])
    
  }

  LogOut(){
    this.router.navigate(['login'])
    localStorage.clear();
  }
  

}

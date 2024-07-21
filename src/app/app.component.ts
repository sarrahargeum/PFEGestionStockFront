// angular import
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './demo/service/notification.service';
import { WebSocketService } from './demo/service/web-socket-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

  // public props
  title = 'gestion Stock';

 

  // notifications: string[] = [];
  public notifications = 0;
  constructor(private webSocketService: WebSocketService,private notificationService: NotificationService) {
    // Open connection with server socket
//     let stompClient = this.webSocketService.connect();
//     stompClient.connect({}, frame => {

// // Subscribe to notification topic
//         stompClient.subscribe('/topic/notification', notifications => {

// // Update notifications attribute with the recent messsage sent from the server
//             this.notifications = JSON.parse(notifications.body).count;
//         })
//     });

  }

  ngOnInit() {
   /* this.notificationService.getNotification().subscribe((message: string) => {
      this.notifications.push(message);
    });*/
  }
  
  

}

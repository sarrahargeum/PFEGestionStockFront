// angular import
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './demo/service/web-Socket.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

  // public props
  title = 'gestion Stock';
  public notifications = 0;
  constructor(private webSocketService: WebSocketService) {

  }

  ngOnInit() {
    this.webSocketService.connect();
  }
  
  sendMessage() {
    this.webSocketService.sendMessage('World');
  }

}

import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Stomp.Client;
  private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    // Initialize the Stomp client with the appropriate settings
    const socket = new SockJS('http://localhost:8099/StockMnager/ws');
    this.stompClient = Stomp.Stomp.over(socket);
    this.stompClient.reconnectDelay = 5000;
    this.stompClient.debug = (str) => { 
//console.log(str);
    };
  }

  connect(role: any): void {
    this.stompClient.onConnect = (frame) => {
console.log('Connected: ' + frame);
   
      // subscribe if admin to recieve out-of-stock notification
      if (role === "admin") {
        this.stompClient.subscribe('/topic/stock/out-of-stock', (message) => {
          if (message.body) {
            this.messageSubject.next(message.body);
          }
        });
      }

      // subscribe if chef magasinier to recieve validation notification
      if (role === "ChefMagasin") {
        console.log("here");
        
        this.stompClient.subscribe('/topic/order/validation', (message) => {
          if (message.body) {
            console.log(message.body)
            this.messageSubject.next(message.body);
          }
        });
      }
    };
    this.stompClient.onStompError = (frame) => {
console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient !== null && this.stompClient.active) {
      this.stompClient.deactivate();
      console.log('Disconnected');
    }
  }

  getMessages(): Observable<Notification> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({ destination: '/app/order/validate', body: message });
    }
  }

}



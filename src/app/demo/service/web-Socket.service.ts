// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
//  private stompClient: Client;

  constructor() { }

 /* connect() {
    const socket = new SockJS('http://localhost:8099/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      }
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/greetings', (message) => {
        console.log(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  sendMessage(message: string) {
    this.stompClient.publish({
      destination: '/app/hello',
      body: message
    });
  }*/
}

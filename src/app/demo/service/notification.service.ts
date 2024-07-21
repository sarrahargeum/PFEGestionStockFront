import { Injectable } from '@angular/core';
//import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
 /* constructor(private socket: Socket) {}

  getNotification(): Observable<any> {
    return this.socket.fromEvent('topic/notifications');
  }*/
}
import { Injectable } from '@angular/core';
//import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

//const config: SocketIoConfig = { url: 'http://localhost:8099/ws', options: {} };

@Injectable({
  providedIn: 'root',
})
export class SocketConfigService {
  getSocketConfig() {
//return config;
  }
}
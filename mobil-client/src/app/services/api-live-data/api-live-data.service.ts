import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiLiveDataService {

  constructor(private socket: Socket) { 

  }

  sendChat(message){
    this.socket.emit('chat', message);
  }

  receiveChat(){
    return this.socket.fromEvent('chat');
  }

  getUsers(){
    console.log("algo se conecto desconecto");
    
    return this.socket.fromEvent('usersOnline');
  }


}

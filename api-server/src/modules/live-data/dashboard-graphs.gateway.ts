import { User } from './../../models/users.entity';
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class DashboardGraphsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    usersConnected: Map<string, User>;

    @WebSocketServer() server;

    usersOnline: number;
    totalUsers: number;

    constructor() {
        this.usersConnected = new Map();
        this.usersOnline = 0;
        this.totalUsers = 0;
    }

    //Funcion que se ejecuta cada que se inicializa correctamente el soket
    afterInit() {
        //console.log('Gateway initialized');
    }

    async handleConnection(client: Socket, ee) {
        // A client has connected
        this.usersOnline++;
        this.totalUsers++;
        // Notify connected clients of current users
        //this.server.emit('usersOnline', this.usersOnline);
        //console.log("usuario conectado");
        //this.server.emit('usersToday', this.totalUsers);
    }

    /////////////////////////////////////////////////////////
    handleDisconnect(client: Socket) {        
        if (/* this.usersConnected[client.id] == undefined */this.usersConnected.has(client.id) == false) {
            //Por alguna razon se entra aqui cada que la app se cierra aun si no se a conectado con la función
            //console.log("conexión sin usuario guardado");
        } else {
            let user = this.usersConnected.get(client.id);

            if (user.userType == 1) {
                //console.log("patient-disconnected");
                client.server.emit('patient-disconnected' + user.idUser, user);
            }
            this.usersConnected.delete(client.id);
            this.usersOnline--;
        }
    }

    @SubscribeMessage('set-user-data')
    async setUserDataConnection(client: Socket, userData: any) {
        if (userData == undefined) {
            console.log("sin usuario");
        } else {
            /* this.usersConnected[] = userData; */
            this.usersConnected.set(client.id, userData);
            //client.server.emit('user-connected', { user: userData, event: 'joined' });
            //paciente conectado y paciente
            if (userData.userType == 0) {
                client.server.emit('monitor-connected' + userData.idUser, userData);

                if (userData.patient == null || userData.patient == undefined) {
                    //console.log("sin paciente");
                } else {
                    let indexFinded = -1;
                    let patient;
                    try {
                        this.usersConnected.forEach((userConected, key, map) => {
                            if (userConected.idUser == userData.patient.idUser) {
                                indexFinded = userConected.idUser;
                                patient = userConected;
                            }
                        });

                        if (indexFinded != -1) {
                            client.server.emit('patient-connected' + patient.idUser, patient);
                        } else {
                            //console.log("paciente desconectado");
                        }
                    } catch (error) {
                        console.log(error);
                        console.log("eerr");
                    }
                }
            } else if (userData.userType == 1) {
                client.server.emit('patient-connected' + userData.idUser, userData);
            }
        }

    }

    @SubscribeMessage('values-patient')
    addMessage(client: Socket, data) {
        //console.log(data);
        if (this.usersConnected.has(client.id) == true) {
            let user = this.usersConnected.get(client.id);
            client.server.emit('set-values-patient'+user.idUser, data );
        } 
    }

    @SubscribeMessage('alerts-patient')
    sendAlertMessage(client: Socket, data) {
        //console.log(data);
        if (this.usersConnected.has(client.id) == true) {
            let user = this.usersConnected.get(client.id);
            client.server.emit('set-alert-patient'+user.idUser, data );
        } 
    }   

    /*     
    
        @SubscribeMessage('chat')
        async onChat(client, message){
            client.broadcast.emit('chat', message);
        } */

}
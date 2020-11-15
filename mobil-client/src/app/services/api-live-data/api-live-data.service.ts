import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DataSessionService } from '../dataSession/data-session.service';
import { User } from '../../classes/user.class';
import { deployConf } from '../../utils/config';
import { AlertData } from '../../classes/alertData.class';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ApiLiveDataService {
  isMonitor = false;
  patientConnected: boolean;
  dataPatient: User;

  dataAlert : AlertData = new AlertData(0,"");

  socket : Socket;

  constructor(public dataSessionService: DataSessionService /*, private socket: Socket */,private utilitiesService : UtilitiesService) {
    this.isMonitor = false;
    this.patientConnected = false;
    this.dataPatient = new User();
  }

  connect( callBack ) {
    this.socket = new Socket({ url: deployConf.apiLocalUrl/* deployConf.apiUrl */, options: { sol : "dsdsd" }});

    this.socket.connect();
    this.socket.emit('set-user-data', this.dataSessionService.user);
    //Subscription a los eventos del paciente // 0 = MONITOR;  1 = PACIENTE
    if (this.dataSessionService.user.userType == 0) {
      this.isMonitor = true;
      
      //Evento de cuando el paciente se conecta
      this.socket.on('patient-connected' + this.dataSessionService.user.patient.idUser, async (patientData) => {
        this.patientConnected = true;
        this.dataPatient = patientData;
        //suscripción al evento de los valores del paciente
        this.socket.on('set-values-patient' + this.dataSessionService.user.patient.idUser, (data) => {
          //console.log(data);
          callBack(data);
        });

        this.socket.on('set-alert-patient' + this.dataSessionService.user.patient.idUser,async (dataAlert : AlertData) => {
          
          if(this.dataAlert.created != dataAlert.created){
            this.dataAlert = dataAlert;
            console.log(dataAlert);
            this.utilitiesService.presentModalAlert(dataAlert);
              /* const modal = await this.modalController.create({
                component: AlertsPage,
                cssClass: 'my-custom-class',
                componentProps: {
                  'alertData': dataAlert
                }
              });
               await modal.present();
             */
          }
        });

        
      });

      //Evento de cuando el paciente se desconecta
      this.socket.on('patient-disconnected' + this.dataSessionService.user.patient.idUser, (data) => {
        this.patientConnected = false;
        this.dataPatient = new User();

        this.socket.removeListener('set-values-patient' + this.dataSessionService.user.patient.idUser, (data) => {
          console.log("desuscrito a los valores");
          
        });

        this.socket.removeListener('set-alert-patient' + this.dataSessionService.user.patient.idUser, (data) => {
          console.log("desuscrito a las alertas");
          
        });
      });
    }else if(this.dataSessionService.user.userType == 1){
      callBack()
    }
    
  }

  sendValues(valuesData : []){
    try {
      this.socket.emit('values-patient', valuesData );
    } catch (error) {
      console.log("esperando conexion");
    }
  }

  sendManualAlert(alertData : AlertData){
    try {
      this.socket.emit('alerts-patient', alertData );
    } catch (error) {
      console.log("esperando conexion");
    }
  }

  disconnect() {
    this.socket.disconnect();
    /* if (this.dataSessionService.user.userType == 1) {
      //Evento de cuando el paciente se desconecta
      
    } */
  }
}
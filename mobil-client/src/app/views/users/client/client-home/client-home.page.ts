import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { LoggedResponse } from '../../../../classes/loggedResponse.class';
import { User } from '../../../../classes/user.class';
import { BluetoothSerialService } from '../../../../services/bluetoothSerial/bluetooth-serial.service';
import { Chart } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core'
import { ApiLiveDataService } from '../../../../services/api-live-data/api-live-data.service';
import { AlertData } from '../../../../classes/alertData.class';


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage implements OnInit {
  actualPatient: User;

  dataToSend = {
    nombre: "",
    edad: 0,
    estadoTransmision: "false",
    estadoAlarma: false,
    valorSensor: {
      tiempo: "0",
      valor: 0
    },
  };

  bpmdata = 0;
  oxigendata = 0;
  airFlow = 0;
  airFlowPercent = 0;

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: Chart;
  showGrafica: boolean = false;

  constructor(public dataSessionService: DataSessionService, public utilitiesService: UtilitiesService, private apiLiveDataService: ApiLiveDataService,
    public bluetoothSerialService: BluetoothSerialService, private changeRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.actualPatient = new User();
    //this.initChart();
  }

  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter() {
    this.actualPatient = new User();
    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      //console.log(loggedResponse);  
      if (this.dataSessionService.user.userType == 0) {
        //Cosas para hacer en caso de que el usuario este actualmente logeado
        if (this.dataSessionService.user.patient == null || this.dataSessionService.user.patient == undefined) {
          this.dataSessionService.navigateByUrl("/monitor-select-client");
        } else {
          this.dataSessionService.navigateByUrl("/monitor-home");
        }
      } else if (this.dataSessionService.user.userType == 1) {
        //this.dataSessionService.navigateByUrl("/client-home"); OK
        this.actualPatient = JSON.parse(JSON.stringify(this.dataSessionService.user));
        this.actualPatient.birthDay = new Date(this.actualPatient.birthDay);
        this.bluetoothSerialService.initBlu();



      } else {
        this.dataSessionService.logOut();
        this.utilitiesService.presentToast("Usuario invalido.", 4000);
      }
    }, (noLoginResponse: LoggedResponse) => {
      //console.log(noLoginResponse);
    });
  }

  error = true;
  async initChart() {
    this.error = true;
    //this.apiLiveDataService.disconnect();
    while (this.error == true) {
      try {
        if(this.lineChart == undefined){
          this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  label: "ECG en V",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [],
                  spanGaps: false,
                }
              ]
            }
  
          });
        }
        
        this.error = false;
        this.changeRef.detectChanges();
        //Iniciar conexion con el real time
        this.apiLiveDataService.connect((data)=>{
          this.changeRef.detectChanges();
          
        });
      } catch (error) {
        this.error = true;
        await this.utilitiesService.sleep(1000);
      }
    }
  }

  connectBT() {
    this.bluetoothSerialService.initBlu();
  }

  selectAndConnect() {
    this.bluetoothSerialService.initDevice((dataFixed) => { // 0 = EGC , 1 = tiempo
      //console.log(dataFixed);
      /* if (this.dataToSend.estadoTransmision == "true") {
        this.dataToSend.valorSensor.tiempo = dataFixed[1]; 
        this.dataToSend.valorSensor.valor = parseFloat(dataFixed[0])
        //Aqui se envia la info al server
        //this.sendInfoSensor();
      } */

      //console.log(this.error);



      this.apiLiveDataService.sendValues(dataFixed);

      this.bpmdata = parseInt(dataFixed[1]);
      this.oxigendata = parseInt(dataFixed[2]);
      this.airFlowPercent = parseInt(dataFixed[3]);
      this.airFlow = parseInt(dataFixed[4]);
      this.changeRef.detectChanges();
      //console.log(this.bpmdata);
      if (this.error == false) {
        
        
        this.addData(""/* dataFixed[1] */, parseFloat(dataFixed[0]));
      } else {
        this.initChart();
      }
    }, async () => {
      this.initChart();
    })
  }

  count = 0;

  addData(label, data) {
    //this.lineChart.data.labels.push(label);
    this.lineChart.data.labels.push("");
    var control = 0;
    if (this.count > 100) {
      this.lineChart.data.labels.shift();
    }

    this.lineChart.data.datasets.forEach((dataset) => {
      if (this.count > 100) {
        if (control == 1) {
          dataset.data.push(data);
        } else {
          dataset.data.push(data);
          dataset.data.shift();
          control = 1;
        }
      } else {
        dataset.data.push(data);
        this.count++;
      }

    });

    this.lineChart.update();
  }

  disconnectBT() {
    this.bluetoothSerialService.deviceDisconnected();
    this.apiLiveDataService.disconnect();
    this.changeRef.detectChanges();
  }

  sendManualAlert(){
    this.apiLiveDataService.sendManualAlert(new AlertData(0,"El paciente requiere atención"))
  }
}

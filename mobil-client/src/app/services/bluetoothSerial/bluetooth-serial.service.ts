import { UtilitiesService } from './../utilities/utilities.service';
import { DataSessionService } from './../dataSession/data-session.service';
import { Injectable } from '@angular/core';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Injectable({
  providedIn: 'root'
})
export class BluetoothSerialService {
  isApp: boolean;

  pairedList: pairedlist;
  listToggle: boolean = false;
  disconectToggle: boolean = false;
  pairedDeviceID: number;
  connectedDevice;

  constructor(public platform: Platform, private alertCtrl: AlertController, private toastCtrl: ToastController,
    public bluetoothSerial: BluetoothSerial, private openNativeSettings: OpenNativeSettings,private dataSessionService : DataSessionService,
    private utilitiesService : UtilitiesService) {

    }

  initBlu(){
    this.platform.ready().then((result) => {
      //console.log(result);
      let plat = this.platform.platforms();
      //console.log(plat);
      if (this.platform.is('mobileweb')) {
        this.isApp = false;
      } else {
        this.isApp = true;
        this.checkBluetoothEnabled();
      }
    })
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(async success => {
      this.listPairedDevices();
    }, async error => {
      console.log(error);
      
      let alert = await this.alertCtrl.create({
        header: 'Aviso',
        subHeader: "Por favor enciende el bluetooth",
        buttons: [{
          text: 'Cancelar',
          handler: () => {
            this.dataSessionService.logOut();
          }
        },{
          text: 'Aceptar',
          handler: () => {
            this.openNativeSettings.open("bluetooth").then(() => {
              console.log("entro al then");
            }).catch((error) => {
              console.log("error");
              console.log(error);
            });
          }
        }]
      });
      alert.present();
    });
  }

  listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
      this.disconectToggle = false;
      this.showToast("Lista recargada");
    }, error => {
      /* this.showError("Please Enable Bluetooth") */
      this.initBlu();
      this.listToggle = false;
      this.disconectToggle = false;
    });
  }

  initDevice(callBackWhenSerialOK,initChart) {
    this.connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!this.connectedDevice.address) {
      this.showError('Select Paired Device to connect');
    } else {
      let address = this.connectedDevice.address;
      let name = this.connectedDevice.name;
      this.connect(address, name,callBackWhenSerialOK,initChart);
    }
  }

  connect(address, name, callBackWhenSerialOK,initChart) {
    this.showToast("Intentando: " + name);
    // Attempt to connect device with specified address, call app.deviceConnected if success
    //this.bluetoothSerial.connect("20:15:10:09:74:44").subscribe(success => {
    this.bluetoothSerial.connect(address).subscribe(success => {      
      this.showToast("Conectado con éxito");
      this.listToggle = false;
      this.disconectToggle = true;
      this.suscribeToSerial(callBackWhenSerialOK,initChart);
    }, error => {
      this.showError("Error conectando con " + name);
    });
  }

  //Función para el serial
  async suscribeToSerial(callBackWhenSerialOK ,initChart) {
    initChart();
    //await this.utilitiesService.sleep(1000);
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      /* try {
        let dataSerialJSON = JSON.parse( success )
        console.log(dataSerialJSON);
      } catch (error) {
        //console.log(success);
      } */
      var arrayNuevo = success.split(",");
      callBackWhenSerialOK(arrayNuevo);
    }, error => {
      this.showError(error);
    });
  }

  async deviceDisconnected() {
    // Unsubscribe from data receiving
    await this.bluetoothSerial.disconnect();
    this.showToast("Device Disconnected");
    this.disconectToggle = false;
    this.listToggle = true;
  }

  async showError(error) {

    let alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();
  }
}

interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}

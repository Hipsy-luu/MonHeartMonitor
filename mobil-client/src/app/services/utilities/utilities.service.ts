import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(public toastController: ToastController,) { }

  //TOAST
  async presentToast(message : string,time : number) {
    const toast = await this.toastController.create({
      message: message,
      duration: time,
      position: 'top'
    });
    toast.present();
  }

  async presentToastWithOptions(title : string,message : string,time : number) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      position: 'top',
      duration: time
    });
    toast.present();
  }

  
  //Tiempo
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Fechas
  getOnlyDate(string){
    let fixMont = new Date(string).getUTCMonth().toString().length == 1 ? "0"+new Date(string).getUTCMonth() : new Date(string).getUTCMonth();
    return "" + new Date(string).getFullYear() + "-" + fixMont + "-" + new Date(string).getDate();
  }

  getOnlyTime(string){
    const birthday = new Date(string);
    let fixMin = birthday.getMinutes().toString().length == 1 ? "0"+birthday.getMinutes() : birthday.getMinutes();
    return "" + birthday.getHours() + ":" + fixMin ;
  }

  yearsDiff(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
    return yearsDiff;
  }

  edad(d1) {
    let date1 = new Date(d1);
    let date2 = new Date();
    let years = this.yearsDiff(d1, date2);
    let months = (years * 12) + (date2.getMonth() - date1.getMonth());
    return Math.trunc(months / 12) ;
  }
}

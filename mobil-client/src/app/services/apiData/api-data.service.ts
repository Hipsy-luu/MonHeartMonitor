import { Injectable } from '@angular/core';
import { deployConf } from './../../utils/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerMessage } from '../../classes/serverMessages.class';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  // Cambiar cada que se ponga en produccion o en algun otro server 
  //baseURL: string = deployConf.apiUrl;
  baseURL: string = deployConf.apiLocalUrl;
  token: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  setToken(newToken: string){
    this.token = newToken;
  }

  doLogin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const data = { email: email , password : password};

      this.http.post(this.baseURL + 'login', data, {}).subscribe((response: ServerMessage) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  getUserData(token: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      this.http.get(this.baseURL + 'login/validate-token', { headers: headers }).subscribe((response: ServerMessage) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  async createUser( newUser: User, password: string,/*  userType: Number */){
    return new Promise((resolve, reject) => {
      const data = {
        newUser : newUser,
        password : password, 
      };

      this.http.post(this.baseURL + 'user/create-user', data, {}).subscribe((response: ServerMessage) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  async updateUser(updatedUser: User){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      });

      this.http.post(this.baseURL + 'user/update-user', updatedUser, {headers: headers}).subscribe((response: ServerMessage) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  async getUserPatient(idPatient : number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      });

      this.http.get(this.baseURL + 'user/get-user-patient/'+idPatient, {headers: headers}).subscribe((response: ServerMessage) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  async setUserPatientToMonitor(idPatient : number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      });

      this.http.get(this.baseURL + 'user/set-user-patient/'+idPatient, {headers: headers}).subscribe((response: ServerMessage) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  
  //TO DO : Implementar correctamente
  /* async changePasswordUser(idUser : Number,newPassword : string,){
    return new Promise((resolve,reject)=>{
      const data = {
        idUser : idUser,
        newPassword : newPassword,
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.token,
      });

      this.http.post(this.baseURL + 'user/change-user-pass',data,{headers:headers}).subscribe((response : ServerMessage)=>{
        resolve(response);
      },(error)=>{
        reject(error)
      });
    })
  } */

  getImage(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      });
      
      this.http.get(url, { headers: headers, responseType: 'blob' })
      .pipe(
        timeout(2000),
        catchError(e => {
          // do something on a timeout
          //reject(e);
          return of(null);
        })
      ).subscribe((imageBlob) => {
        let objectURL = "";
        if (imageBlob != null && imageBlob != undefined){
          objectURL = URL.createObjectURL(imageBlob);
        }
        resolve(this.sanitizer.bypassSecurityTrustUrl(objectURL) );
      }, (error: ServerMessage) => {
        reject(error);
      });
    });
  } 
  //TO DO : Implementar correctamente
  /* deleteImageUser(idUser){
    return new Promise((resolve,reject)=>{
      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.token,
      });
      this.http.get(this.baseURL + 'uploads/user-delete-image/'+idUser,{headers:headers}).subscribe((response : ServerMessage)=>{
        resolve(response);
      },(error)=>{
        reject(new ServerMessage(true,"A ocurrido un error inesperado",error));
      });
    });
  } */
}

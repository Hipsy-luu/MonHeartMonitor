import { Injectable } from '@angular/core';
import { User } from '../../classes/user.class';
import { ApiDataService } from '../apiData/api-data.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { Storage } from '@ionic/storage';
import { ServerMessage } from '../../classes/serverMessages.class';
import { Router } from '@angular/router';
import { LoggedResponse } from '../../classes/loggedResponse.class';

@Injectable({
  providedIn: 'root'
})
export class DataSessionService {
  token: string;
  user: User;
  baseURL: string;

  //Variables para las vistas

  constructor(
    private apiDataService: ApiDataService,
    private utilitiesService: UtilitiesService,
    private storage: Storage,
    private router: Router) {

    this.token = '';
    this.user = new User();
    this.baseURL = apiDataService.baseURL;
    // Esto ocurre cada que se crea este servicio en cada una de las vistas
    // storage.remove('token');
    storage.get('token').then((token) => {
      if (token == null) {
        storage.set('token', this.token + '').then(
          () => {
            console.log('Primer uso');
          }, (error) => {
            this.utilitiesService.presentToast('Error iniciando storage', 4000);
          }
        );
      } else {
        this.token = token;
        // console.log(this.token);
        // Acciones a realizar cuando el token estaba ya guardado pero la data para la interfaz no esta disponible
        // Se sabe que no esta disponible porque apenas se mando llamar el constructor
        if (this.token.length > 3) {
          // Cosas por hacer en caso de que el token exista que es lo mismo que tener la sesión guardada
          this.apiDataService.setToken(this.token);
          //console.log('con sesión');
          this.apiDataService.getUserData(this.token).then((response: ServerMessage) => {
            // console.log(response);
            if (response.error == false) {
              //Update the user data
              this.setUserData(response.data.user);
              if (this.user.userType == 0 ) {
                if(this.user.patient == null || this.user.patient == undefined){
                  this.navigateByUrl("/monitor-select-client");
                }        
              } else  if ( this.user.userType == 1 ){
                
              } else {
                // cuando el usuario no es valido
                //console.log(response);
                this.navigateByUrl('/login');
              }
              /* console.log(this.user); */
            } else {
              // Cosas para hacer cuando la sesión es invalida
              this.navigateByUrl('/login');
              console.log(response);
            }
          }, (error) => {
            // Cuando ocurre un error solicitando la data al server
            this.utilitiesService.presentToast('Error obteniendo el usuario', 4000);
            this.navigateByUrl('/login');
            console.log(error);
          });

        } else {
          //this.navigateByUrl('/login');
          console.log('sin sesión');
        }
      }
    }, (error) => {
      this.utilitiesService.presentToast('Error obteniendo el usuario de la cache', 4000);
      this.navigateByUrl('/login');
      console.log('error');
    });
  }

  async checkLogin(successCallBack, errorCallBack) {
    // console.log(this.token);
    this.token = JSON.parse(JSON.stringify(await this.storage.get('token')));
    // console.log(JSON.parse(JSON.stringify(this.storage.get('token'))));
    if (this.token === '') {
      errorCallBack(new LoggedResponse(true, 'Sin token'));
    } else {
      this.apiDataService.setToken(this.token);
      //console.log("ussssss");
      
      //console.log(this.user);

      if (this.user.email == '') {
        this.apiDataService.getUserData(this.token).then((response: ServerMessage) => {
          //console.log(response);
          // tslint:disable-next-line: triple-equals
          if (response.error == true) {
            this.navigateByUrl('/login');
            errorCallBack(new LoggedResponse(false, response.message));
          } else {
            //Update the user data
            this.setUserData(response.data.user);
            successCallBack(new LoggedResponse(false, 'Con token y usuario actualizado'));
            //Si se tuviera imagen se hace lo sig para cargarla
            /* if (this.user.haveImage) {
              this.apiDataService.getImage(this.baseURL.toString() +
                'uploads/user-image/' + this.user.idUser.toString()).then((image) => {
                  this.user.imageBlob = image;
                  successCallBack(new LoggedResponse(false, 'Con token y usuario actualizado'));
                  // console.log(this.user);
                }, (error) => {
                  console.log(error);
                  this.user.imageBlob = '';
                  errorCallBack(new LoggedResponse(true, 'A ocurrido un error obteniendo la imagen del usuario'));
                });
            } else {
              successCallBack(new LoggedResponse(false, 'Con token y usuario actualizado'));
              // console.log(this.user);
            } */
            /* console.log(this.user); */
          }
        }, (error) => {
          console.log(error);
          errorCallBack(new LoggedResponse(true, 'A ocurrido un error'));
        });
      } else {
        successCallBack(new LoggedResponse(false, 'Con token y usuario actualizado'));
        //Si se tuviera imagen se hace lo sig para cargarla
        /* if (this.user.haveImage == true){
          if (this.user.imageBlob == ''){
            this.apiDataService.getImage(this.baseURL.toString() +
            'uploads/user-image/' + this.user.idUser.toString()).then((image: string) => {
              this.user.imageBlob = image;
              // console.log(image);
              successCallBack(new LoggedResponse(false, 'Sesión Con token e información de usuario'));
            }, (error) => {
              console.log(error);
              this.user.imageBlob = '';
              errorCallBack(new LoggedResponse(true, 'A ocurrido un error obteniendo la imagen del usuario'));
            });
          }else{
            successCallBack(new LoggedResponse(false, 'Sesión Con token e información de usuario'));
          }
        }else{
          successCallBack(new LoggedResponse(false, 'Sesión Con token e información de usuario'));
        } */
      }
    }
  }

  logOut() {
    this.storage.set('token', '');
    this.token = '';
    this.user = new User();
    this.navigateByUrl('/login');
  }

  loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.apiDataService.doLogin(email, password).then((response: ServerMessage) => {
        if (response.error == false) {
          // this.utilitiesService.presentToast("Iniciando sesión",2000);
          // Lógica con la que guardamos los datos del inicio de sesión
          this.storage.set('token', response.data.token + '').then(
            () => {
              console.log('Inicio de sesión correcto');
              this.token = response.data.token;
              this.apiDataService.setToken(this.token);
            }, (error) => {
              this.utilitiesService.presentToast('Error guardando storage', 4000);
            }
          );
          resolve(response);
        } else {
          reject(response);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  setUserData(updatedData: any) {
    /* console.log(updatedData); */
    
    this.user.idUser = updatedData.idUser;

    //all users
    this.user.fullName = updatedData.fullName;
    this.user.email = updatedData.email;
    this.user.phone = updatedData.phone;
    this.user.userType = updatedData.userType;  //0 = monitor, 1 = paciente
    this.user.createDate = new Date(updatedData.createDate);
    this.user.lastLogin = new Date(updatedData.lastLogin);
    this.user.deleted = updatedData.deleted;
    this.user.description = updatedData.description;

    

    //user paciente
    this.user.active = updatedData.active;
    this.user.genre = updatedData.genre;
    this.user.birthDay = new Date(updatedData.birthDay);
    this.user.direction = updatedData.direction;
    this.user.weight = updatedData.weight;
    this.user.height = updatedData.height;

    //user monitor
    this.user.patient = updatedData.patient;
    this.user.monitors = updatedData.monitors;

    //console.log(this.user);
  }

  navigateByUrl(url: string) {
    this.router.navigate([url]);
  }
}

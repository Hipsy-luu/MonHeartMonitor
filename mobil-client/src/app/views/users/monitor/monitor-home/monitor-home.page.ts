import { Component, OnInit } from '@angular/core';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { LoggedResponse } from '../../../../classes/loggedResponse.class';
import { User } from '../../../../classes/user.class';

@Component({
  selector: 'app-monitor-home',
  templateUrl: './monitor-home.page.html',
  styleUrls: ['./monitor-home.page.scss'],
})
export class MonitorHomePage implements OnInit {
  actualPatient : User;
  
  constructor(public dataSessionService: DataSessionService, public utilitiesService: UtilitiesService) { }


  ngOnInit() {
    this.actualPatient = new User();
    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      //console.log(loggedResponse);  
      if (this.dataSessionService.user.userType == 0 ) {
        //Cosas para hacer en caso de que el usuario este actualmente logeado
        if(this.dataSessionService.user.patient == null || this.dataSessionService.user.patient == undefined){
          this.dataSessionService.navigateByUrl("/monitor-select-client");
        }else{
          //this.dataSessionService.navigateByUrl("/monitor-home"); OK
          this.actualPatient = JSON.parse( JSON.stringify( this.dataSessionService.user.patient ) ) ;
          this.actualPatient.birthDay = new Date(this.actualPatient.birthDay);
        }
      } else  if ( this.dataSessionService.user.userType == 1 ){
        this.dataSessionService.navigateByUrl("/client-home");
      } else {
        this.dataSessionService.logOut();
        this.utilitiesService.presentToast("Usuario invalido.", 4000);
      }
    }, (noLoginResponse: LoggedResponse) => {
      //console.log(noLoginResponse);
    });
  }

}

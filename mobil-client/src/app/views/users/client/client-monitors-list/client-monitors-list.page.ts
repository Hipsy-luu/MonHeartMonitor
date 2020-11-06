import { User } from './../../../../classes/user.class';
import { Component, OnInit } from '@angular/core';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { LoggedResponse } from '../../../../classes/loggedResponse.class';

@Component({
  selector: 'app-client-monitors-list',
  templateUrl: './client-monitors-list.page.html',
  styleUrls: ['./client-monitors-list.page.scss'],
})
export class ClientMonitorsListPage implements OnInit {

  actualMonitors : User[];

  constructor(private dataSessionService: DataSessionService, private utilitiesService: UtilitiesService) { }


  ngOnInit() {
    this.actualMonitors = [];
    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      //console.log(loggedResponse);  
      if (this.dataSessionService.user.userType == 0 ) {
        //Cosas para hacer en caso de que el usuario este actualmente logeado
        if(this.dataSessionService.user.patient == null || this.dataSessionService.user.patient == undefined){
          this.dataSessionService.navigateByUrl("/monitor-select-client");
        }else{
          this.dataSessionService.navigateByUrl("/monitor-home");
        }
      } else  if ( this.dataSessionService.user.userType == 1 ){
        //this.dataSessionService.navigateByUrl("/client-home"); OK
        console.log(this.dataSessionService.user.monitors);
        this.actualMonitors = [...this.dataSessionService.user.monitors];
        
      } else {
        this.dataSessionService.logOut();
        this.utilitiesService.presentToast("Usuario invalido.", 4000);
      }
    }, (noLoginResponse: LoggedResponse) => {
      //console.log(noLoginResponse);
    });
  }

}

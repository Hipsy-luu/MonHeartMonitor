import { Component, OnInit } from '@angular/core';
import { DataSessionService } from '../../services/dataSession/data-session.service';
import { ApiLiveDataService } from '../../services/api-live-data/api-live-data.service';
import { UtilitiesService } from '../../services/utilities/utilities.service';
import { LoggedResponse } from '../../classes/loggedResponse.class';
import { ServerMessage } from '../../classes/serverMessages.class';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.page.html',
  styleUrls: ['./home-test.page.scss'],
})
export class HomeTestPage implements OnInit {
  numWomens: number;
  numMens: number;

  constructor(private dataSessionService: DataSessionService, private utilitiesService: UtilitiesService,
              private apiLiveDataService: ApiLiveDataService) {
    this.numMens = 13;
    this.numWomens = 13;
  }


  ngOnInit() {
    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      // console.log(loggedResponse);
      // console.log("init login respuesta");
      if (this.dataSessionService.user.userType === 0 || this.dataSessionService.user.userType === 1 || this.dataSessionService.user.userType == 2) {
        // Cosas para hacer en caso de que el usuario este actualmente logeado
        console.log('inicio correcto');


      } else {
        this.dataSessionService.logOut();
        this.utilitiesService.presentToast('Usuario invalido.', 4000);
      }
    }, (noLoginResponse: LoggedResponse) => {
      // console.log(noLoginResponse);
    });
  }

}

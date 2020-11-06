import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiDataService } from '../../../../services/apiData/api-data.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { LoggedResponse } from '../../../../classes/loggedResponse.class';
import { User } from '../../../../classes/user.class';
import { ServerMessage } from '../../../../classes/serverMessages.class';

@Component({
  selector: 'app-monitor-select-client',
  templateUrl: './monitor-select-client.page.html',
  styleUrls: ['./monitor-select-client.page.scss'],
})
export class MonitorSelectClientPage implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private apiDataService: ApiDataService,
    private utilitiesService: UtilitiesService, public dataSessionService: DataSessionService) { }

  ngOnInit() {
    this.setupForm();
    //console.log("init login");
    //this.dataSessionService.logOut();

    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      if (this.dataSessionService.user.userType == 0) {
        this.setupForm(  );
      } else if (this.dataSessionService.user.userType == 1) {
        if(this.dataSessionService.user.patient == null || this.dataSessionService.user.patient == undefined){
          this.dataSessionService.navigateByUrl("/monitor-select-client");
        }  
      } else {
        this.dataSessionService.logOut();
        this.utilitiesService.presentToast("Usuario invalido.", 4000);
      }
    }, (noLoginResponse: LoggedResponse) => {
      //console.log(noLoginResponse);
    });
  }

  setupForm() {
    this.registerForm = this.formBuilder.group({
      code: ["", [/* Validators.email ,*/ Validators.maxLength(6), Validators.minLength(6), Validators.required]],
    });
  }

  onSubmit() {
    let text: string = this.code.value;
    this.apiDataService.getUserPatient(parseInt(text)).then((response: ServerMessage) => {
      //console.log(response);
      if (response.error == false) {
        this.apiDataService.setUserPatientToMonitor( response.data.idUser ).then((response : ServerMessage)=>{
          console.log(response);
          if(response.error == false){
            this.setupForm();
            this.utilitiesService.presentToast(response.message,4000);
            this.dataSessionService.navigateByUrl("/monitor-home");
          }else if(response.error == true){
            this.utilitiesService.presentToast(response.message,4000);
          }
        }).catch((error)=>{
          console.log("error");
          this.utilitiesService.presentToast("Ups! a ocurrido un error ",4000);
          console.log(error);
        }); 
        /* this.setupForm();
        this.utilitiesService.presentToast(response.message, 4000); */
      } else if (response.error == true) {
        this.utilitiesService.presentToast(response.message, 4000);
      }
    }).catch((error) => {
      console.log("error");
      this.utilitiesService.presentToast("Ups! a ocurrido un error ", 4000);
      console.log(error);
    });

  }

  get code(): AbstractControl {
    return this.registerForm.get('code');
  }

}

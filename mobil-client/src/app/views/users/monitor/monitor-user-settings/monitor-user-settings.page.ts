import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiDataService } from '../../../../services/apiData/api-data.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { LoggedResponse } from '../../../../classes/loggedResponse.class';
import { User } from '../../../../classes/user.class';
import { ServerMessage } from '../../../../classes/serverMessages.class';

@Component({
  selector: 'app-monitor-user-settings',
  templateUrl: './monitor-user-settings.page.html',
  styleUrls: ['./monitor-user-settings.page.scss'],
})
export class MonitorUserSettingsPage implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private apiDataService: ApiDataService,
    private utilitiesService: UtilitiesService, private dataSessionService: DataSessionService) { }

  ngOnInit() {
    this.setupForm();
    //console.log("init login");
    //this.dataSessionService.logOut();

    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      //console.log(loggedResponse);  
      if (this.dataSessionService.user.userType == 0 ) {
        //Cosas para hacer en caso de que el usuario este actualmente logeado
        if(this.dataSessionService.user.patient == null || this.dataSessionService.user.patient == undefined){
          this.dataSessionService.navigateByUrl("/monitor-select-client");
        }else{
          this.setupForm();
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

  setupForm() {
    let fixedUser : User = JSON.parse( JSON.stringify(this.dataSessionService.user ) );

    //Fix Date
    fixedUser.createDate = new Date(fixedUser.createDate);
    fixedUser.lastLogin = new Date(fixedUser.lastLogin);
    fixedUser.birthDay = new Date(fixedUser.birthDay);

    let fixedDate = fixedUser.birthDay.getFullYear() + "-" + (fixedUser.birthDay.getMonth() + 1) + "-" +fixedUser.birthDay.getDate() ;
    const rePhone = /^[0-9]{10}$/;

    this.registerForm = this.formBuilder.group({
      email: [fixedUser.email, [Validators.email, Validators.required]],
      fullName: [fixedUser.fullName, [Validators.minLength(4), Validators.required]],
      phone: [fixedUser.phone, [Validators.pattern(rePhone), Validators.required]],
      birthDay : [fixedDate, [Validators.required]],
      /* weight : [fixedUser.weight, [Validators.required]],
      height : [fixedUser.height, [Validators.required]],
      direction : [fixedUser.direction, [Validators.minLength(4) , Validators.required]], */
      genre: [fixedUser.genre, [Validators.required]],
    });
  }

  onSubmit() {

      let dataNewUser = new User();

      
      //all users
      dataNewUser.idUser = this.dataSessionService.user.idUser;
      dataNewUser.fullName = this.fullName.value;
      dataNewUser.email = this.email.value;
      dataNewUser.phone = this.phone.value;
      dataNewUser.userType = 0;  //0 = monitor, 1 = paciente
      //dataNewUser.createDate = new Date();
      //dataNewUser.lastLogin = new Date();
      dataNewUser.deleted = false;
      dataNewUser.description = "";
  
      //user monitor
      //this.patient = new User();
      
      //user paciente
      dataNewUser.active = false;
      dataNewUser.genre = this.genre.value;
      dataNewUser.birthDay =  new Date( this.birthDay.value );
      dataNewUser.direction = this.dataSessionService.user.direction/* this.direction.value */;
      dataNewUser.weight = this.dataSessionService.user.weight/* this.weight.value */;
      dataNewUser.height = this.dataSessionService.user.height/* this.height.value */;
      //console.log(dataNewUser);
  
      this.apiDataService.updateUser(dataNewUser).then((response : ServerMessage)=>{
        console.log(response);
        if(response.error == false){
          this.dataSessionService.setUserData(response.data)
          this.setupForm();
          this.utilitiesService.presentToast(response.message,4000);

        }else if(response.error == true){
          this.utilitiesService.presentToast(response.message,4000);
        }
      }).catch((error)=>{
        console.log("error");
        this.utilitiesService.presentToast("Ups! a ocurrido un error ",4000);
        console.log(error);
      }); 
    
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get fullName(): AbstractControl {
    return this.registerForm.get('fullName');
  }

  get phone(): AbstractControl {
    return this.registerForm.get('phone');
  }

  get genre(): AbstractControl {
    return this.registerForm.get('genre');
  }

  get birthDay(): AbstractControl {
    return this.registerForm.get('birthDay');
  }

  /* get height(): AbstractControl {
    return this.registerForm.get('height');
  }

  get weight(): AbstractControl {
    return this.registerForm.get('weight');
  }

  get direction(): AbstractControl {
    return this.registerForm.get('direction');
  } */
}

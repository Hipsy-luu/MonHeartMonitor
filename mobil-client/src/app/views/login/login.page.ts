import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { DataSessionService } from '../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../services/utilities/utilities.service';
import { LoggedResponse } from '../../classes/loggedResponse.class';
import { ServerMessage } from '../../classes/serverMessages.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private dataSessionService: DataSessionService, private utilitiesService: UtilitiesService) { }


  ngOnInit() {
    this.setupForm();
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
    this.loginForm = this.formBuilder.group({
      email: ['luismi.luu5@gmail.com', [Validators.email, Validators.required]],
      password: ['qwertyuiop', [Validators.minLength(8), Validators.required]]
      /* email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]] */
    });
  }

  //Function for do the login
  onSubmit() {
    this.dataSessionService.loginUser(this.email.value , this.password.value).then((response: ServerMessage) => {
      //this.setupForm();
      //console.log(response);
      //console.log(this.dataSessionService.user);
      this.dataSessionService.setUserData(response.data.user);
      if (response.data.user.userType == 0 ) {
        //Cosas para hacer en caso de que el usuario este actualmente logeado
        
        if(response.data.user.patient == null || response.data.user.patient == undefined){
          this.dataSessionService.navigateByUrl("/monitor-select-client");
        }else{
          this.dataSessionService.navigateByUrl("/monitor-home");
        }
      } else  if ( response.data.user.userType == 1 ){
        
        this.dataSessionService.navigateByUrl("/client-home");
      } else {
        this.dataSessionService.logOut();
        this.utilitiesService.presentToast("Usuario invalido.", 4000);
      }
    }, (error) => {
      console.log("error");
      console.log(error);
      this.utilitiesService.presentToast(error.message, 4000);
    }); 
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}

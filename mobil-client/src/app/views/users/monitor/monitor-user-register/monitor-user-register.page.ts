import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiDataService } from '../../../../services/apiData/api-data.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { ServerMessage } from '../../../../classes/serverMessages.class';
import { User } from '../../../../classes/user.class';

@Component({
  selector: 'app-monitor-user-register',
  templateUrl: './monitor-user-register.page.html',
  styleUrls: ['./monitor-user-register.page.scss'],
})
export class MonitorUserRegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private apiDataService: ApiDataService,
    private utilitiesService: UtilitiesService, private dataSessionService: DataSessionService) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    const rePhone = /^[0-9]{10}$/;
    this.registerForm = this.formBuilder.group({
      email: ['luismi.luu4@gmail.com', [Validators.email, Validators.required]],
      fullName: ['Luismiguel Ortiz', [Validators.minLength(4), Validators.required]],
      phone: ['6394740742', [Validators.pattern(rePhone), Validators.required]],
      password: ['qwertyuiop', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['qwertyuiop', [Validators.minLength(8), Validators.required]],
      genre: [0, [Validators.required]],
      acceptTerms: [true, [Validators.requiredTrue, Validators.required]],
    });
  }

  passValidate() : boolean {
    if( this.password.value != this.passwordConfirm.value ){
      return true;
    }else{
      return false;
    }
  }

  onSubmit() {
    if( this.passValidate() ){
      this.utilitiesService.presentToast("Las contraseñas no coinciden",2000);
    }else{
      let dataNewUser = new User();
      //all users
      dataNewUser.fullName = this.fullName.value;
      dataNewUser.email = this.email.value;
      dataNewUser.phone = this.phone.value;
      dataNewUser.userType = 0;  //0 = monitor, 1 = paciente
      dataNewUser.createDate = new Date();
      dataNewUser.lastLogin = new Date();
      dataNewUser.deleted = false;
      dataNewUser.description = "";
  
      //user monitor
      //this.patient = new User();
  
      //user paciente
      dataNewUser.active = false;
      dataNewUser.genre = this.genre.value;
      dataNewUser.birthDay = new Date();
      dataNewUser.direction = "";
  
      /* console.log(dataNewUser); */
  
      this.apiDataService.createUser(dataNewUser,this.password.value).then((response : ServerMessage)=>{
        console.log(response);
        
        if(response.error == false){
          this.utilitiesService.presentToast(response.message,4000);
          console.log( "usuario "+ dataNewUser.email + " --- "+ this.password.value);
          

          this.dataSessionService.loginUser(dataNewUser.email , this.password.value).then((response: ServerMessage) => {
            this.setupForm();
            console.log(response);
            
            this.dataSessionService.navigateByUrl("/login");    
          }, (error) => {
            console.log("error");
            console.log(error);
            this.utilitiesService.presentToast("Ups a ocurrido un error", 4000);
          }); 

        }else if(response.error == true){
          this.utilitiesService.presentToast(response.message,4000);
        }
      }).catch((error)=>{
        console.log("error");
        this.utilitiesService.presentToast("Ups! a ocurrido un error ",4000);
        console.log(error);
      }); 
    }
    
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

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.registerForm.get('passwordConfirm');
  }

  get acceptTerms(): AbstractControl {
    return this.registerForm.get('acceptTerms');
  }

}

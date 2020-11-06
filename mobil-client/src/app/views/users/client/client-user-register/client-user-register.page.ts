import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiDataService } from '../../../../services/apiData/api-data.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { User } from '../../../../classes/user.class';
import { ServerMessage } from '../../../../classes/serverMessages.class';

@Component({
  selector: 'app-client-user-register',
  templateUrl: './client-user-register.page.html',
  styleUrls: ['./client-user-register.page.scss'],
})
export class ClientUserRegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private apiDataService: ApiDataService,
    private utilitiesService: UtilitiesService, private dataSessionService: DataSessionService) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    const rePhone = /^[0-9]{10}$/;
    let fixedDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" +new Date().getDate() ;
    this.registerForm = this.formBuilder.group({
      email: ['luismi.luu5@gmail.com', [Validators.email, Validators.required]],
      fullName: ['Luismiguel Ortiz', [Validators.minLength(4), Validators.required]],
      phone: ['6394740742', [Validators.pattern(rePhone), Validators.required]],
      birthDay : [fixedDate, [Validators.required]],
      weight : [0, [Validators.required]],
      height : [0, [Validators.required]],
      direction : ['calle', [Validators.minLength(4) , Validators.required]],
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
      dataNewUser.userType = 1;  //0 = monitor, 1 = paciente
      dataNewUser.createDate = new Date();
      dataNewUser.lastLogin = new Date();
      dataNewUser.deleted = false;
      dataNewUser.description = "";
  
      //user monitor
      //this.patient = new User();
  
      //user paciente
      dataNewUser.active = false;
      dataNewUser.genre = this.genre.value;
      dataNewUser.birthDay = new Date(this.birthDay.value);
      dataNewUser.direction = this.direction.value;
      dataNewUser.weight = this.weight.value;
      dataNewUser.height = this.height.value;
      
  
      /* console.log(dataNewUser); */
  
      this.apiDataService.createUser(dataNewUser,this.password.value).then((response : ServerMessage)=>{
        console.log(response);
        
        if(response.error == false){
          this.utilitiesService.presentToast(response.message,4000);
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

  get birthDay(): AbstractControl {
    return this.registerForm.get('birthDay');
  }

  get height(): AbstractControl {
    return this.registerForm.get('height');
  }

  get weight(): AbstractControl {
    return this.registerForm.get('weight');
  }

  get direction(): AbstractControl {
    return this.registerForm.get('direction');
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


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';




import { MonitorUserRegisterPageRoutingModule } from './monitor-user-register-routing.module';
import { MonitorUserRegisterPage } from './monitor-user-register.page';


import { FivPasswordInputModule  } from '@fivethree/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //Imports for inteligent forms
    ReactiveFormsModule,
    FivPasswordInputModule,
    MonitorUserRegisterPageRoutingModule,
  ],
  declarations: [MonitorUserRegisterPage]
})
export class MonitorUserRegisterPageModule {}

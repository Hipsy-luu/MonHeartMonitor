import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientUserRegisterPageRoutingModule } from './client-user-register-routing.module';

import { ClientUserRegisterPage } from './client-user-register.page';
import { FivPasswordInputModule } from '@fivethree/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //Imports for inteligent forms
    ReactiveFormsModule,
    FivPasswordInputModule,
    
    ClientUserRegisterPageRoutingModule
  ],
  declarations: [ClientUserRegisterPage]
})
export class ClientUserRegisterPageModule {}

import { FivPasswordInputModule } from '@fivethree/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientUserSettingsPageRoutingModule } from './client-user-settings-routing.module';

import { ClientUserSettingsPage } from './client-user-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //Imports for inteligent forms
    ReactiveFormsModule,
    FivPasswordInputModule,
    ClientUserSettingsPageRoutingModule
  ],
  declarations: [ClientUserSettingsPage]
})
export class ClientUserSettingsPageModule {}

import { FivPasswordInputModule } from '@fivethree/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorUserSettingsPageRoutingModule } from './monitor-user-settings-routing.module';

import { MonitorUserSettingsPage } from './monitor-user-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //Imports for inteligent forms
    ReactiveFormsModule,
    FivPasswordInputModule,
    MonitorUserSettingsPageRoutingModule
  ],
  declarations: [MonitorUserSettingsPage]
})
export class MonitorUserSettingsPageModule {}

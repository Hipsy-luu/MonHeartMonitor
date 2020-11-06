import { FivPasswordInputModule } from '@fivethree/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorSelectClientPageRoutingModule } from './monitor-select-client-routing.module';

import { MonitorSelectClientPage } from './monitor-select-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //Imports for inteligent forms
    ReactiveFormsModule,
    FivPasswordInputModule,
    MonitorSelectClientPageRoutingModule
  ],
  declarations: [MonitorSelectClientPage]
})
export class MonitorSelectClientPageModule {}

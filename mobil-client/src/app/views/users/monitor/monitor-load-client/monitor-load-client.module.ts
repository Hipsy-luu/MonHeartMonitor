import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorLoadClientPageRoutingModule } from './monitor-load-client-routing.module';

import { MonitorLoadClientPage } from './monitor-load-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorLoadClientPageRoutingModule
  ],
  declarations: [MonitorLoadClientPage]
})
export class MonitorLoadClientPageModule {}

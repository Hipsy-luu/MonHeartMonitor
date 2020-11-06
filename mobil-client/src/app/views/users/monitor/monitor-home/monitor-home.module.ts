import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorHomePageRoutingModule } from './monitor-home-routing.module';

import { MonitorHomePage } from './monitor-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorHomePageRoutingModule
  ],
  declarations: [MonitorHomePage]
})
export class MonitorHomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsPageRoutingModule } from './us-routing.module';

import { UsPage } from './us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsPageRoutingModule
  ],
  declarations: [UsPage]
})
export class UsPageModule {}

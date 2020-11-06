import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientMonitorsListPageRoutingModule } from './client-monitors-list-routing.module';

import { ClientMonitorsListPage } from './client-monitors-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientMonitorsListPageRoutingModule
  ],
  declarations: [ClientMonitorsListPage]
})
export class ClientMonitorsListPageModule {}

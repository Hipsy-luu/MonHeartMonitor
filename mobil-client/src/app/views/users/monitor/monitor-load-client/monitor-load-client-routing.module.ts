import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorLoadClientPage } from './monitor-load-client.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorLoadClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorLoadClientPageRoutingModule {}

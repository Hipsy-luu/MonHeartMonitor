import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorSelectClientPage } from './monitor-select-client.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorSelectClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorSelectClientPageRoutingModule {}

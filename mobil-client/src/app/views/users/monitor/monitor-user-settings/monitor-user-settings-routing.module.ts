import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorUserSettingsPage } from './monitor-user-settings.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorUserSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorUserSettingsPageRoutingModule {}

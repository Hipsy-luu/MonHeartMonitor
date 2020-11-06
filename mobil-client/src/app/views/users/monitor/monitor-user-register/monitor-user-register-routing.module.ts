import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorUserRegisterPage } from './monitor-user-register.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorUserRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorUserRegisterPageRoutingModule {}

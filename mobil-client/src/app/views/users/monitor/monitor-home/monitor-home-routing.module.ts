import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorHomePage } from './monitor-home.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorHomePageRoutingModule {}

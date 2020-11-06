import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientMonitorsListPage } from './client-monitors-list.page';

const routes: Routes = [
  {
    path: '',
    component: ClientMonitorsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientMonitorsListPageRoutingModule {}

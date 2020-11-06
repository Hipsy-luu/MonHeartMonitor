import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientUserRegisterPage } from './client-user-register.page';

const routes: Routes = [
  {
    path: '',
    component: ClientUserRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientUserRegisterPageRoutingModule {}

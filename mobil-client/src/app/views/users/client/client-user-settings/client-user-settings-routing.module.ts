import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientUserSettingsPage } from './client-user-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ClientUserSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientUserSettingsPageRoutingModule {}

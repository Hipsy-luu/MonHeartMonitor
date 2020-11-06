import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionTypeUserPage } from './selection-type-user.page';

const routes: Routes = [
  {
    path: '',
    component: SelectionTypeUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionTypeUserPageRoutingModule {}

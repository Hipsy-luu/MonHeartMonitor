import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectionTypeUserPageRoutingModule } from './selection-type-user-routing.module';

import { SelectionTypeUserPage } from './selection-type-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectionTypeUserPageRoutingModule
  ],
  declarations: [SelectionTypeUserPage]
})
export class SelectionTypeUserPageModule {}

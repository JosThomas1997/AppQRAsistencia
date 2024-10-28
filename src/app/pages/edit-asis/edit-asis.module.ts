import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAsisPageRoutingModule } from './edit-asis-routing.module';

import { EditAsisPage } from './edit-asis.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAsisPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditAsisPage]
})
export class EditAsisPageModule {}

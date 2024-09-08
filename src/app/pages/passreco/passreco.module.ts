import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassrecoPageRoutingModule } from './passreco-routing.module';

import { PassrecoPage } from './passreco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassrecoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PassrecoPage]
})
export class PassrecoPageModule {}

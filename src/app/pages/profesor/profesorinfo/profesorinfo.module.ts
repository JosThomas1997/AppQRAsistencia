import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorinfoPageRoutingModule } from './profesorinfo-routing.module';

import { ProfesorinfoPage } from './profesorinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorinfoPageRoutingModule
  ],
  declarations: [ProfesorinfoPage]
})
export class ProfesorinfoPageModule {}

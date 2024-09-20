import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorasisPageRoutingModule } from './profesorasis-routing.module';

import { ProfesorasisPage } from './profesorasis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorasisPageRoutingModule
  ],
  declarations: [ProfesorasisPage]
})
export class ProfesorasisPageModule {}

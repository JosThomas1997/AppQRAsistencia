import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';

import { IonicModule } from '@ionic/angular';

import { ProfesorasisqrPageRoutingModule } from './profesorasisqr-routing.module';

import { ProfesorasisqrPage } from './profesorasisqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorasisqrPageRoutingModule,
    QrCodeModule
  ],
  declarations: [ProfesorasisqrPage]
})
export class ProfesorasisqrPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudianteinfoPageRoutingModule } from './estudianteinfo-routing.module';

import { EstudianteinfoPage } from './estudianteinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudianteinfoPageRoutingModule
  ],
  declarations: [EstudianteinfoPage]
})
export class EstudianteinfoPageModule {}

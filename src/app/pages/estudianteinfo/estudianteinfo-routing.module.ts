import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteinfoPage } from './estudianteinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EstudianteinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteinfoPageRoutingModule {}

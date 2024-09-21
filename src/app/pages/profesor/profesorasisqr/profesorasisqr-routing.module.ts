import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorasisqrPage } from './profesorasisqr.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorasisqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorasisqrPageRoutingModule {}

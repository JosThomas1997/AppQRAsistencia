import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorasisPage } from './profesorasis.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorasisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorasisPageRoutingModule {}

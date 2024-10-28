import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorinfoPage } from './profesorinfo.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorinfoPageRoutingModule {}

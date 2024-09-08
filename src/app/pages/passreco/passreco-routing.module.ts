import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassrecoPage } from './passreco.page';

const routes: Routes = [
  {
    path: '',
    component: PassrecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassrecoPageRoutingModule {}

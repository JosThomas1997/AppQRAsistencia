import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAsisPage } from './edit-asis.page';

const routes: Routes = [
  {
    path: '',
    component: EditAsisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAsisPageRoutingModule {}

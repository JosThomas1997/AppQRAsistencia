import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorPage } from './profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  },  {
    path: 'profesorasis',
    loadChildren: () => import('./profesorasis/profesorasis.module').then( m => m.ProfesorasisPageModule)
  },
  {
    path: 'profesorasisqr',
    loadChildren: () => import('./profesorasisqr/profesorasisqr.module').then( m => m.ProfesorasisqrPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorPageRoutingModule {}

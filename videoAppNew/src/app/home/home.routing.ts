import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';

const adminRoutes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: InstruccionesComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRouting {}
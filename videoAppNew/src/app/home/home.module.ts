import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componente
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';

@NgModule({
  declarations: [
    HomeComponent,
    InstruccionesComponent
  ],
  imports: [
    CommonModule,
    HomeRouting
  ]
})
export class HomeModule { }
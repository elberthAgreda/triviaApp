import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componente
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';
import { CumplimientoComponent } from './cumplimiento/cumplimiento.component';
import { RiesgosComponent } from './riesgos/riesgos.component';
import { SarlaftComponent } from './sarlaft/sarlaft.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ControlComponent } from './control/control.component';
import { CrearComponent } from './crear/crear.component';

@NgModule({
  declarations: [
    HomeComponent,
    InstruccionesComponent,
    CumplimientoComponent,
    RiesgosComponent,
    SarlaftComponent,
    SeguridadComponent,
    ControlComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    HomeRouting
  ]
})
export class HomeModule { }
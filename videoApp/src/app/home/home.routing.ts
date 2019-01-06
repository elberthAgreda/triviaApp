import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ControlComponent } from './control/control.component';
import { CumplimientoComponent } from './cumplimiento/cumplimiento.component';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';
import { RiesgosComponent } from './riesgos/riesgos.component';
import { SarlaftComponent } from './sarlaft/sarlaft.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { CrearComponent } from './crear/crear.component';

const adminRoutes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: InstruccionesComponent },
      { path: 'control-interno', component: ControlComponent },
      { path: 'instrucciones', component: InstruccionesComponent },
      { path: 'cumplimiento', component: CumplimientoComponent },
      { path: 'riesgos', component: RiesgosComponent },
      { path: 'sarlaft', component: SarlaftComponent },
      { path: 'seguridad', component: SeguridadComponent },
      { path: 'crear-video', component: CrearComponent }
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
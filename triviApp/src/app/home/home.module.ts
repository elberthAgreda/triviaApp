import { NgModule }             from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Routing
import { HomeRouting } from './home.routing';
// Components
import { HomeComponent } from './home.component';
import { NivelComponent } from './nivel/nivel.component';
import { VideoComponent } from './video/video.component';
// Service
import { CustomSevice } from '../shared/services/custom.service';
import { ErrorComponent } from './error/error.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRouting,
        FormsModule
    ],
    declarations: [
        HomeComponent,
        NivelComponent,
        VideoComponent,
        ErrorComponent,
        InicioComponent,
    ],
    providers: [
        //AdministradorGuard,
        CustomSevice
    ]
})
export class HomeModule{}
import { NgModule }             from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Routing
import { HomeRouting } from './home.routing';
// Components
import { HomeComponent } from './home.component';
import { Nivel1Component } from './nivel1/nivel1.component';
// Service
import { CustomSevice } from '../shared/services/custom.service';

@NgModule({
    imports: [
        CommonModule,
        HomeRouting,
        FormsModule
    ],
    declarations: [
        HomeComponent,
        Nivel1Component,
    ],
    providers: [
        //AdministradorGuard,
        CustomSevice
    ]
})
export class HomeModule{}
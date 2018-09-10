import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { Nivel1Component } from "./nivel1/nivel1.component";

const adminRoutes: Routes = [
  {
    path: '',
    //canActivate: [AdministradorGuard],
    component: HomeComponent,
    children: [
      { path: "", component: Nivel1Component },
      { path: "nivel", component: Nivel1Component }
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
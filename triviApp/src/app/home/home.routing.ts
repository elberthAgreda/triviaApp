import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { Nivel1Component } from "./nivel1/nivel1.component";
import { VideoComponent } from "./video/video.component";

const adminRoutes: Routes = [
  {
    path: '',
    //canActivate: [AdministradorGuard],
    component: HomeComponent,
    children: [
      { path: "", component: Nivel1Component },
      { path: "nivel/:id", component: Nivel1Component },
      { path: "video/:id", component: VideoComponent }
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
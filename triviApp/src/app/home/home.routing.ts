import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NivelComponent } from "./nivel/nivel.component";
import { VideoComponent } from "./video/video.component";
import { ErrorComponent } from "./error/error.component";
import { InicioComponent } from "./inicio/inicio.component";
// Guards
import { AuthGuard } from "../shared/auth/auth.guards";

const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: "inicio", component: InicioComponent },
      { path: "nivel", component: NivelComponent },
      { path: "video", component: VideoComponent },
      { path: "error", component: ErrorComponent }
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
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Routing
import { HomeRouting } from "./home.routing";
// Components
import { HomeComponent } from "./home.component";
import { NivelComponent } from "./nivel/nivel.component";
import { VideoComponent } from "./video/video.component";
// Service
import { CustomSevice } from "../shared/services/custom.service";
import { ErrorComponent } from "./error/error.component";
import { InicioComponent } from "./inicio/inicio.component";
// Guards
import { AuthGuard } from "../shared/auth/auth.guards";
import { FinalizadoComponent } from "./finalizado/finalizado.component";
import { LoaderModule } from "../shared/loader/loader.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    FormsModule,
    LoaderModule],
  declarations: [
    HomeComponent,
    NivelComponent,
    VideoComponent,
    ErrorComponent,
    InicioComponent,
    FinalizadoComponent
  ],
  providers: [AuthGuard, CustomSevice]
})
export class HomeModule {}

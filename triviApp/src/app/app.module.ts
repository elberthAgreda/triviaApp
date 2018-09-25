import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
// Routing
import { AppRouting } from './app.routing';
import { LocalService } from './shared/services/local.service';
<<<<<<< Updated upstream
// Service
import { CustomSevice } from './shared/services/custom.service';
=======
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouting
  ],
<<<<<<< Updated upstream
  providers: [LocalService,CustomSevice],
=======
  providers: [LocalService],
>>>>>>> Stashed changes
  bootstrap: [AppComponent]
})
export class AppModule { }
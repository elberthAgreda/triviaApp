import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// Routing
import { AppRouting } from './app.routing';
import { LocalService } from './shared/services/local.service';
// Service
import { CustomSevice } from './shared/services/custom.service';
import { LoginComponent } from './login/login.component';
import { RecuperarUserComponent } from './recuperar-user/recuperar-user.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RegistroComponent } from './registro/registro.component';
import { LoaderModule } from './shared/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarPassComponent,
    RecuperarUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRouting,
    LoaderModule
  ],
  providers: [LocalService,CustomSevice],
  bootstrap: [AppComponent]
})
export class AppModule { }
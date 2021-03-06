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
// Service
import { CustomSevice } from './shared/services/custom.service';
// Directivas
import { OnlyNumber } from './shared/directives/onlyNumber.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from './shared/loader/loader.module';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RecuperarUserComponent } from './recuperar-user/recuperar-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarPassComponent,
    RecuperarUserComponent,
    OnlyNumber
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoaderModule,
    FormsModule,
    AppRouting
  ],
  providers: [LocalService, CustomSevice],
  bootstrap: [AppComponent]
})
export class AppModule { }
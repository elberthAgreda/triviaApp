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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    OnlyNumber
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRouting
  ],
  providers: [LocalService,CustomSevice],
  bootstrap: [AppComponent]
})
export class AppModule { }
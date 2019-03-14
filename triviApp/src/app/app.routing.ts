import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RecuperarUserComponent } from './recuperar-user/recuperar-user.component';

const appRoutes: Routes = [
	{
    path: '',
    component: AppComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "login", component: LoginComponent },
      { path: "registro", component: RegistroComponent },
      { path: "recuperar", component: RecuperarPassComponent },
      { path: "recuperar-user", component: RecuperarUserComponent },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: "**", component: LoginComponent }
    ]
  }
];

@NgModule({
	imports: [
	  RouterModule.forRoot(appRoutes, { useHash: true })
	],
	exports: [
	  RouterModule
	]
  })
export class AppRouting { }
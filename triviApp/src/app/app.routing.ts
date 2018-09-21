import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const appRoutes: Routes = [
	{
    path: '',
    component: AppComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "login", component: LoginComponent },
      { path: "registro", component: RegistroComponent },
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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RecuperarUserComponent } from './recuperar-user/recuperar-user.component';
import { RegistroComponent } from './registro/registro.component';

const appRoutes: Routes = [
	{
    path: '',
    component: AppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'video', loadChildren: () => import('./video/video.module').then(m => m.VideoModule) },
      { path: "registro", component: RegistroComponent },
      { path: "recuperar", component: RecuperarPassComponent },
      { path: "recuperar-user", component: RecuperarUserComponent },
      { path: '**', component: LoginComponent }
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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	{
    path: '',
    component: AppComponent,
    children: [
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'login', component: LoginComponent },
      { path: 'video', loadChildren: './video/video.module#VideoModule' },
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
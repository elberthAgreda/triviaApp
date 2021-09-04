import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guards';
import { VideoComponent } from './video.component';

const adminRoutes: Routes = [
  { path: '', component: VideoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class VideoRouting {}
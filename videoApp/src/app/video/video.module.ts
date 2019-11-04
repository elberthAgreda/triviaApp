import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Componente
import { VideoComponent } from './video.component';
// Routing
import { VideoRouting } from './video.routing';
import { AuthGuard } from '../shared/auth/auth.guards';

@NgModule({
  declarations: [ VideoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    VideoRouting
  ],
  providers:[AuthGuard]
})
export class VideoModule { }
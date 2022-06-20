import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { VideoModule } from './video/video.module';

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    PagesRoutingModule,
    HomeModule,
    VideoModule
  ]
})
export class PagesModule { }

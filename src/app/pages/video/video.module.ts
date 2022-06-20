import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ]
})
export class VideoModule { }

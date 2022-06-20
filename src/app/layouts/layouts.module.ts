import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutsComponent } from './layouts.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    NavbarComponent,
    LayoutsComponent
  ],
  imports: [
  CommonModule,
  RouterModule,
  MatSidenavModule,
  MatGridListModule,
  MatToolbarModule
  ]
})
export class LayoutsModule { }

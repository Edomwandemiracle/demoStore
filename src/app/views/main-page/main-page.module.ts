import { appRoutesLazyLoad } from './lazy-load.route';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    // SharedModule,
    RouterModule.forChild(appRoutesLazyLoad),
  ],
})
export class MainPageModule {}

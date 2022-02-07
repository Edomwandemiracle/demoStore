import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

export const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
];
@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [],
})
export class LandingPageModule {}

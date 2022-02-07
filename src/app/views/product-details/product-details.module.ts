import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details.component';

export const appRoutes: Routes = [
  { path: '', component: ProductDetailsComponent },
  { path: 'product_details', component: ProductDetailsComponent },
];
@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [],
})
export class ProductDetailModule {}

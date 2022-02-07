import { MainPageComponent } from './main-page.component';
import { Routes } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';

export const appRoutesLazyLoad: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      {
        path: '/',
        loadChildren: () =>
          import('../landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('../product-details/product-details.module').then(
            (m) => m.ProductDetailModule
          ),
      },
    ],
  },
];

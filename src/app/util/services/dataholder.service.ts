import { Product } from './../models/product';
import { Cart } from './../models/cart';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataHolderService {
  dsProducts = new BehaviorSubject<Product | null>(null);
  products = this.dsProducts.asObservable();

  dsCart = new BehaviorSubject<Cart[] | null>(null);
  Cart = this.dsCart.asObservable();

  dscartLength = new BehaviorSubject<number | null>(null);
  cartLength = this.dsCart.asObservable();
  constructor() {}

  sendProduct(product: Product): void {
    this.dsProducts.next(product);
  }
  sendCart(cart: Cart[]): void {
    this.dsCart.next(cart);
  }
  sendCartLength(length: number): void {
    this.dscartLength.next(length);
  }
}

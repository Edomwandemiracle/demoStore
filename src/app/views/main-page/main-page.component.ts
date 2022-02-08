import { Component, OnInit } from '@angular/core';

import { Cart } from '../../util/models/cart';
import { DataHolderService } from '../../util/services/dataholder.service';
import { ProductService } from 'src/app/util/services/product.service';

@Component({
  selector: 'app-store-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  currentUrl: string = 'Main Page';
  cart: Cart[] = [];
  subTotal: number = 0;
  total: number = 0;
  shippingFee: number = 0;
  display: boolean = false;
  cartLength: number = 0;
  constructor(
    private dataHolderService: DataHolderService,
    private productService: ProductService
  ) {
    this.dataHolderService.dsCart.subscribe((res: any) => {
      if (res) {
        this.cart = res;
        this.cartLength = this.cart.reduce(
          (n, { selectedQuantity }) => n + selectedQuantity,
          0
        );
        this.cart.forEach((cartItem) => {
          cartItem.subTotal = cartItem.selectedQuantity * cartItem.price;
          localStorage.setItem('TC', JSON.stringify(this.cart));
          this.subTotal = this.cart.reduce(
            (n, { subTotal }) => n + subTotal,
            0
          );
          this.total = this.subTotal;
        });
      }
    });
    this.dataHolderService.dscartLength.subscribe((res: any) => {
      if (res) {
        this.cartLength = res;
      }
    });
    this.dataHolderService.dscartState.subscribe((res: any) => {
      if (res) {
        this.display = res;
      }
    });
  }

  ngOnInit(): void {
    this.cartLength = this.productService.getCartLength();

    if (localStorage.getItem('TC')) {
      this.cart = JSON.parse(localStorage.getItem('TC') as string);
      this.subTotal = this.cart.reduce((n, { subTotal }) => n + subTotal, 0);
      this.total = this.subTotal;
    }
  }

  add(item: Cart) {
    this.cart.forEach((cartItem) => {
      if (item.productId === cartItem.productId) {
        if (
          cartItem.product?.quantity &&
          cartItem.selectedQuantity < cartItem.product?.quantity
        ) {
          cartItem.selectedQuantity += 1;
          cartItem.subTotal = cartItem.selectedQuantity * cartItem.price;
          localStorage.setItem('TC', JSON.stringify(this.cart));
          this.cart = JSON.parse(localStorage.getItem('TC') as string);
          this.subTotal = this.cart.reduce(
            (n, { subTotal }) => n + subTotal,
            0
          );
          this.total = this.subTotal;
        }
      }
    });
    this.cartLength = this.productService.getCartLength();
  }
  reduce(item: Cart) {
    this.cart.forEach((cartItem) => {
      if (item.productId === cartItem.productId) {
        if (cartItem.selectedQuantity !== 0) {
          cartItem.selectedQuantity -= 1;
          cartItem.subTotal = cartItem.selectedQuantity * cartItem.price;
          localStorage.setItem('TC', JSON.stringify(this.cart));
          this.cart = JSON.parse(localStorage.getItem('TC') as string);
          this.subTotal = this.cart.reduce(
            (n, { subTotal }) => n + subTotal,
            0
          );
          this.total = this.subTotal;
        }
      }
    });
    this.cartLength = this.productService.getCartLength();
  }

  remove(item: Cart) {
    this.cart.forEach((cartItem) => {
      if (cartItem.productId === item.productId) {
        this.cart.splice(
          this.cart.findIndex((a) => a.productId == cartItem.productId),
          1
        );

        localStorage.removeItem('TC');
        this.cartLength = 0;
      }
    });
  }
  toggleDisplay() {
    this.display = !this.display;
  }
  addToBag() {
    localStorage.removeItem('TC');
    this.toggleDisplay();
  }
}

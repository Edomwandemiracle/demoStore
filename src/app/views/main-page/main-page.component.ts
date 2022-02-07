import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cart } from '../../util/models/cart';
import { DataHolderService } from '../../util/services/dataholder.service';

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
  constructor(
    private _location: Location,
    private route: Router,
    private dataHolderService: DataHolderService
  ) {
    // localStorage.setItem('TC', '');
    this.dataHolderService.dsCart.subscribe((res: any) => {
      if (res) {
        this.cart = res;
      }
    });
  }

  ngOnInit(): void {
    // localStorage.setItem('TC', '');
    // this.dataHolderService.dsCart.subscribe((res: any) => {
    //   this.cart = res;
    // });
    if (localStorage.getItem('TC')) {
      this.cart = JSON.parse(localStorage.getItem('TC') as string);
      this.cart.forEach((cartItem) => {
        cartItem.total = cartItem.selectedQuantity * cartItem.price;
        this.subTotal += cartItem.total;
        cartItem.shipping = 0;
        this.shippingFee += cartItem.shipping;
        this.total = this.subTotal + cartItem.shipping;
      });
    } else {
      console.log(this.cart);
      this.cart.forEach((cartItem) => {
        cartItem.total = cartItem.selectedQuantity * cartItem.price;
        this.subTotal += cartItem.total;
      });
    }
  }
  // getCart() {
  //   console.log('====================================');
  //   console.log(this.cart);
  //   console.log('====================================');
  // }
  add(item: Cart) {
    this.cart.forEach((cartItem) => {
      if (item.productId === cartItem.productId) {
        if (
          cartItem.product?.quantity &&
          cartItem.selectedQuantity < cartItem.product?.quantity
        ) {
          cartItem.selectedQuantity += 1;
          cartItem.total = cartItem.selectedQuantity * cartItem.price;
          this.subTotal = cartItem.total;
          localStorage.setItem('TC', JSON.stringify(this.cart));
        }
      }
    });
  }
  reduce(item: Cart) {
    this.cart.forEach((cartItem) => {
      if (item.productId === cartItem.productId) {
        if (cartItem.selectedQuantity !== 0) {
          cartItem.selectedQuantity -= 1;
          cartItem.total = cartItem.selectedQuantity * cartItem.price;
          this.subTotal = cartItem.total;
          localStorage.setItem('TC', JSON.stringify(this.cart));
        }
      }
    });
  }

  // removeZeroQuantity(item: Cart) {
  //   this.cart.forEach((cartItem) => {
  //     if (cartItem.productId === item.productId) {
  //       if (cartItem.selectedQuantity === 0) {
  //         this.cart.splice(
  //           this.cart.findIndex((a) => a.productId == cartItem.productId),
  //           1
  //         );
  //         cartItem.total = cartItem.selectedQuantity * cartItem.price;
  //         // this.subTotal = cartItem.total;
  //       }
  //       // cartItem.total = cartItem.selectedQuantity * cartItem.price;
  //       // this.subTotal = cartItem.total;
  //       localStorage.setItem('TC', JSON.stringify(this.cart));
  //     }
  //   });
  // }
  remove(item: Cart) {
    this.cart.forEach((cartItem) => {
      if (cartItem.productId === item.productId) {
        this.cart.splice(
          this.cart.findIndex((a) => a.productId == cartItem.productId),
          1
        );
        cartItem.total = cartItem.selectedQuantity * cartItem.price;

        localStorage.setItem('TC', JSON.stringify(this.cart));
      }
    });
    // if (this.cart.length === 0) {
    //   localStorage.removeItem('TC');
    // }
  }
  toggleDisplay() {
    this.display = !this.display;
  }
}

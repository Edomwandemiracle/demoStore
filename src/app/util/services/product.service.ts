import { EventEmitter, Injectable, Input } from '@angular/core';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { DataHolderService } from './dataholder.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // products: Product[];

  constructor(private dataHolderService: DataHolderService) {}
  getProduct(): Product[] {
    const products = new Array<Product>();
    var product = new Product();
    product.id = '1';
    product.name = `V Neck T-Shirt`;
    product.description = `As classic as they come, this is the garment that speaks to every man. Designed to stand the test of
          time, our signature straight-cut crew neck T-Shirt is made from premium heavyweight Egyptian cotton jersey and
          accentuated with a ribbed neckline. Playing the role of both statement and staple, this piece will be the most
          worn item in your wardrobe.`;
    product.colors = ['Black', 'Red', 'White'];
    product.price = 40;
    product.quantity = 10;
    product.defaultImageUrl = '../../../assets/v_neck/v_neck.png';
    product.imageUrl = [
      '../../../assets/v_neck2/v_neck2.png',
      '../../../assets/v_neck3/v_neck3.png',
      '../../../assets/v_neck4/v_neck4.png',
    ];
    product.category = `Men's fashion`;
    product.subcategory = 'Shirt';
    product.sizes = ['Small', 'Large', 'X-large'];
    products.push(product);

    var product = new Product();
    product.id = '2';
    product.name = 'Mocks';
    product.description = `As classic as they come, this is the garment that speaks to every man. Designed to stand the test of
          time, our signature straight-cut crew neck T-Shirt is made from premium heavyweight Egyptian cotton jersey and
          accentuated with a ribbed neckline. Playing the role of both statement and staple, this piece will be the most
          worn item in your wardrobe.`;
    product.colors = ['Black', 'Brown', 'White'];
    product.price = 120;
    product.quantity = 10;
    product.defaultImageUrl = '../../../assets/monks/monks.png';
    product.imageUrl = [
      '../../../assets/monks/monks.png',
      '../../../assets/monks/monks.png',
      '../../../assets/monks/monks.png',
    ];
    product.category = '';
    product.subcategory = '';
    product.sizes = ['42', '43', '44', '45'];
    products.push(product);
    return products;
  }

  addToCart(cart: Cart): void {
    if (!localStorage.getItem('TC')) {
      localStorage.setItem('TC', '');
    }
    let cartObj = localStorage.getItem('TC');
    if (!cartObj) {
      let newCart = [cart];
      localStorage.setItem('TC', JSON.stringify(newCart));
    } else {
      let c: Cart[] = JSON.parse(localStorage.getItem('TC') as string);
      c.filter((cartItem) => {
        if (cartItem.productId === cart.productId) {
          if (
            cartItem.product?.quantity &&
            cartItem.selectedQuantity < cartItem.product?.quantity
          ) {
            cartItem.selectedQuantity += 1;
            localStorage.setItem('TC', JSON.stringify(c));
            this.dataHolderService.sendCart(c);
          }
        } else {
          let newCart: Cart[] = [];
          newCart = [...c, cart];
          newCart = [...new Set(newCart)];
          // console.log(newCart);
          localStorage.setItem('TC', JSON.stringify(newCart));
          this.dataHolderService.sendCart(newCart);
        }
      });
    }
  }
}

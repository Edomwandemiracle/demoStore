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
    // product.shipping = 0;
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
    // product.shipping = 0;
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

    var product = new Product();
    product.id = '3';
    product.name = 'Classic Low Bridge Sunglasses';
    product.description = `Refresh your style with these laid back sunglasses. An easy-wear oval is cut with a keyhole bridge for vintage character. White frames with black earpieces, this frame comes with a two year warranty.`;
    product.colors = [];
    product.price = 150;
    product.quantity = 10;
    // product.shipping = 0;
    product.defaultImageUrl = '../../../assets/landing_img/landing_img.png';
    product.imageUrl = [
      '../../../assets/sunglasses1-min.jpg',
      '../../../assets/sunglasses2-min.jpg',
      '../../../assets/sunglasses3-min.jpg',
    ];
    product.category = '';
    product.subcategory = '';
    product.sizes = [];
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
      this.getCartLength();
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
            this.getCartLength();
          }
        } else {
          let newCart: Cart[] = [];
          newCart = [...c, cart];
          newCart = [...new Set(newCart)];
          localStorage.setItem('TC', JSON.stringify(newCart));
          this.dataHolderService.sendCart(newCart);
          this.getCartLength();
        }
      });
    }
  }
  getCartLength(): any {
    if (localStorage.getItem('TC')) {
      let cart: Cart[] = JSON.parse(localStorage.getItem('TC') as string);

      let cartLength: number = cart.reduce(
        (n, { selectedQuantity }) => n + selectedQuantity,
        0
      );
      this.dataHolderService.sendCartLength(cartLength);
      return cartLength;
    }
  }
}

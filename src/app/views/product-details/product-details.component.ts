import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/util/models/product';
import { DataHolderService } from '../../util/services/dataholder.service';
import { Cart } from '../../util/models/cart';
import { ProductService } from 'src/app/util/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  colors = ['Black', 'Red', 'White'];
  sizes = ['Small', 'Large', 'X-large'];
  form: FormGroup;
  product!: Product;
  imageUrl: string = '';
  @Input() itemCart = new EventEmitter();
  constructor(
    fb: FormBuilder,
    private productService: ProductService,
    private dataHolderService: DataHolderService
  ) {
    this.form = fb.group({
      color: ['', Validators.required],
      size: ['', Validators.required],
    });
    this.dataHolderService.dsProducts.subscribe((res: any) => {
      this.product = res;
    });
  }

  ngOnInit(): void {
    this.imageUrl = this.product.defaultImageUrl;
  }
  onChangeImg(img: string) {
    this.imageUrl = img;
  }
  toggleLoading() {
    let cart: Cart = {
      color: this.form.controls['color'].value,
      size: this.form.controls['size'].value,
      selectedQuantity: 1,
      product: this.product,
      productId: this.product.id,
      price: this.product.price,
    };

    this.productService.addToCart(cart);
  }
}

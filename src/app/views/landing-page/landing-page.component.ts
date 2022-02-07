import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/util/services/product.service';
import { Product } from '../../util/models/product';
import { DataHolderService } from '../../util/services/dataholder.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  products: Product[] = [];
  bannerProduct!: Product;
  constructor(
    private productService: ProductService,
    private dataHolderService: DataHolderService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBannerProduct();
  }
  getProducts(): Product[] {
    return (this.products = this.productService.getProduct());
  }
  goToProductDetailPage(product: Product): void {
    this.dataHolderService.sendProduct(product);
    this.route.navigate(['/product-details']);
  }
  getBannerProduct() {
    this.bannerProduct = this.products[2];
  }
  explore() {
    this.dataHolderService.sendProduct(this.bannerProduct);
    this.route.navigate(['/product-details']);
  }
}

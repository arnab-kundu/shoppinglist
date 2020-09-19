import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Product} from "../models/product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  products: Product[] = [];

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;

      console.log('data from data service ' + this.products);
    });
  }

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

}

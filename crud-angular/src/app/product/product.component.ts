import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

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

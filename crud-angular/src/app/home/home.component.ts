import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ProductService} from "../product.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  getProductsByGroup(group: string): void {
    this.service.getProductsByGroup(group).subscribe(products => {
      this.products = products;

      console.log('data from data service ' + this.products);
    });
  }

  constructor(private service: ProductService) {
    this.getProductsByGroup("Men");
  }

  ngOnInit(): void {
  }

}

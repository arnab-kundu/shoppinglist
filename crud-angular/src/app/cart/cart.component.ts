import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Product} from "../models/product";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  constructor(private service: CartService) {
    this.getProductsInCart('1');
  }

  getProductsInCart(user_id: string) {
    this.service.getProductsInCart(user_id).subscribe(products => {
      this.products = products;
    })
  }

  deleteProductFromCart(product_id: string) {
    this.service.deleteProductFromCart('1', product_id).subscribe(products => {
      this.getProductsInCart('1');
    })
  }

  ngOnInit(): void {
  }

}

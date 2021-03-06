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
  subTotal: number = 0;
  tax: number = 0;
  cartTotal: number = 0;
  user_id = '-1';

  constructor(private service: CartService) {
    if (localStorage.getItem('token') != null) {
      this.user_id = localStorage.getItem('token')
    }
    this.getProductsInCart(this.user_id);
  }

  getProductsInCart(user_id: string) {
    this.service.getProductsInCart(user_id).subscribe(products => {
      this.products = products;
      this.calculateTotal(products);
    })
  }

  deleteProductFromCart(product_id: string) {
    this.service.deleteProductFromCart(this.user_id, product_id).subscribe(products => {
      this.getProductsInCart(this.user_id);
      this.calculateTotal(products);
    })
  }

  ngOnInit(): void {
  }

  calculateTotal(products: Product[]) {
    this.subTotal = 0;
    this.tax = 0;
    this.cartTotal = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.subTotal += (products[i].price * products[i].product_count)
    }
    this.tax = this.subTotal * 10 / 100;
    this.cartTotal = this.subTotal + this.tax;
  }
}

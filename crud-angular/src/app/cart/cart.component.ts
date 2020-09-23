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
  cartTotal: number = 0;

  constructor(private service: CartService) {
    this.getProductsInCart('1');
  }

  getProductsInCart(user_id: string) {
    this.service.getProductsInCart(user_id).subscribe(products => {
      this.products = products;
      this.calculateTotal(products);
    })
  }

  deleteProductFromCart(product_id: string) {
    this.service.deleteProductFromCart('1', product_id).subscribe(products => {
      this.getProductsInCart('1');
    })
  }

  ngOnInit(): void {
  }

  calculateTotal(products: Product[]) {
    for (let i = 0; i < this.products.length; i++) {
      this.cartTotal += (products[i].price * products[i].product_count)
    }
  }
}

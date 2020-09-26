import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../wishlist.service";
import {Product} from "../models/product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products: Product[] = [];
  user_id = '-1';

  getProductsInWishList(user_id: string) {
    this.service.getProductsInWishList(user_id).subscribe(products => {
      this.products = products;
    })
  }

  deleteProductFromWishList(product_id: string) {
    this.service.deleteProductFromWishList(this.user_id, product_id).subscribe(products => {
      this.getProductsInWishList(this.user_id);
    })
  }

  addToCart(product_id: number) {
    this.productService.addToCart(this.user_id, product_id, 1).subscribe(data => {
      console.log(data);
    });
  }

  combineAction(product_id: number) {
    this.addToCart(product_id);
    this.deleteProductFromWishList(product_id + "");
  }


  constructor(private service: WishlistService, private productService: ProductService) {
    if (localStorage.getItem('token') != null) {
      this.user_id = localStorage.getItem('token')
    }
    this.getProductsInWishList(this.user_id);
  }


  ngOnInit(): void {
  }

}

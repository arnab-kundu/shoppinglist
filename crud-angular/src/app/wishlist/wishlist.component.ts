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

  getProductsInWishList(user_id: string) {
    this.service.getProductsInWishList(user_id).subscribe(products => {
      this.products = products;
    })
  }

  deleteProductFromWishList(product_id: string) {
    this.service.deleteProductFromWishList('1', product_id).subscribe(products => {
      this.getProductsInWishList('1');
    })
  }

  addToCart(product_id: number) {
    this.productService.addToCart('1', product_id, 1).subscribe(data => {
      console.log(data);
    });
  }

  combineAction(product_id: number){
    this.addToCart(product_id);
    this.deleteProductFromWishList(product_id+"");
  }


  constructor(private service: WishlistService, private productService: ProductService) {
    this.getProductsInWishList('1');
  }


  ngOnInit(): void {
  }

}

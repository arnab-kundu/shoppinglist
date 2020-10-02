import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../models/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  group: string = "";
  recentlyViewedProducts: Product[] = [];
  user_id = '-1';
  items = [
    {id: 1, value: 12},
    {id: 2, value: 18},
    {id: 3, value: 24}
  ];

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;

      console.log('data from data service ' + this.products);
    });
  }

  getProductsByGroup(group: string): void {
    this.productService.getProductsByGroup(group).subscribe(products => {
      this.products = products;
    })
  }

  getRecentlyViewedProducts(user_id: string) {
    this.productService.getRecentlyViewedProducts(user_id).subscribe(recentlyViewedProducts => {
      this.recentlyViewedProducts = recentlyViewedProducts;

      console.log('data from data service ' + this.products);
    });
  }

  addToCart(product_id: number) {
    this.productService.addToCart(this.user_id, product_id).subscribe(data => {
      console.log(data);
    });
  }

  addToWishList(user_id: string, product_id: number) {
    this.productService.addToWishList(this.user_id, product_id).subscribe(data => {
      console.log(data);
    })
  }

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    if (localStorage.getItem('token') != null) {
      this.user_id = localStorage.getItem('token')
    }
    console.log('token: ' + localStorage.getItem('token'));
    // snapshot for one time only get queryParamMap when constructor gets called
    /*if (this.route.snapshot.queryParamMap.has('group')) {
      this.getProductsByGroup(this.route.snapshot.queryParamMap.get('group'))
    } else {
      this.getProducts();
    }*/

    // Observer for queryParamMap keep on watching for changes
    this.route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('group')) {
        this.getProductsByGroup(queryParamMap.get('group'))
        this.group = queryParamMap.get('group')
      } else {
        this.getProducts();
      }
    });
    this.getRecentlyViewedProducts(this.user_id);
  }

  getProductById(id: number) {
    console.log(id);
  }

  ngOnInit(): void {
  }

  getProductsOfPageSize(pageSize) {
    console.log(pageSize);
    this.productService.getProducts(pageSize).subscribe(products => {
      this.products = products;

      console.log('data from data service ' + this.products);
    });
  }

}

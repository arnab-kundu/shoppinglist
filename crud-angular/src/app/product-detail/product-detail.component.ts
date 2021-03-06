import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ProductService} from "../product.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  user_id = '-1';
  items = [
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 3},
    {id: 4, value: 4},
    {id: 5, value: 5}
  ];
  selectedItemCount = 1;

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.product = products[0];

      console.log('data from data service ' + this.product);
    });
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(products => {
      this.product = products[0];
    });
  }

  setRecentlyViewedProduct(product_id: string) {
    this.productService.setRecentlyViewedProduct(this.user_id, product_id).subscribe(data => {
      console.log(data);
    });
  }

  addToCart(product_id: number, numberOfProductSelected: number) {
    this.productService.addToCart(this.user_id, product_id, numberOfProductSelected).subscribe(data => {
      console.log(data);
    });
  }

  addToWishList(user_id: string, product_id: number) {
    this.productService.addToWishList(this.user_id, product_id).subscribe(data => {
      console.log(data);
    })
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    if (localStorage.getItem('token') != null) {
      this.user_id = localStorage.getItem('token')
    }
    console.log('token: ' + localStorage.getItem('token'));
    this.route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('id')) {
        this.getProductById(queryParamMap.get('id'));
        this.setRecentlyViewedProduct(queryParamMap.get('id'));
      } else {
        this.getProducts();
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  selectCartProductCount(count) {
    console.log(count);
    this.selectedItemCount = count;
  }
}

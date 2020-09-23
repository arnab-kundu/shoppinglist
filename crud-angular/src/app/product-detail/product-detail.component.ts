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
    this.productService.setRecentlyViewedProduct(1, product_id).subscribe(data => {
      console.log(data);
    });
  }

  addToCart(product_id: number, numberOfProductSelected: number) {
    this.productService.addToCart('1', product_id, numberOfProductSelected).subscribe(data => {
      console.log(data);
    });
  }

  addToWishList(user_id: string, product_id: number) {
    this.productService.addToWishList('1', product_id).subscribe(data => {
      console.log(data);
    })
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
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
}

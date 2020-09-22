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


  constructor(private productService: ProductService, private route: ActivatedRoute) {

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
    })
  }

  getProductById(id: number) {
    console.log(id);
  }

  ngOnInit(): void {
  }

}

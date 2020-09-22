import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Constant} from './constant';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) {
  }

  getProducts() {
    return this.http.get('http://' + Constant.IP + ':3000/api/product/products')
      .pipe(map(res => res.json()));
  }

  getProductsByGroup(group: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/product/products?group=' + group)
      .pipe(map(res => res.json()));
  }

  getProductById(id: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/product/products?id=' + id)
      .pipe(map(res => res.json()));
  }

  setRecentlyViewedProduct(user_id: number, product_id: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/recently_viewed/add_product?user_id=' + user_id + '&product_id=' + product_id)
      .pipe(map(res => res.json()));
  }

  getRecentlyViewedProducts(user_id: number) {
    return this.http.get('http://' + Constant.IP + ':3000/api/recently_viewed/get_products?user_id=' + user_id)
      .pipe(map(res => res.json()));
  }
}

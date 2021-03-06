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

  getProducts(pageSize: number = 12) {
    return this.http.get('http://' + Constant.IP + ':3000/api/product/products?limit=' + pageSize)
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

  setRecentlyViewedProduct(user_id: string, product_id: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/recently_viewed/add_product?user_id=' + user_id + '&product_id=' + product_id)
      .pipe(map(res => res.json()));
  }

  getRecentlyViewedProducts(user_id: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/recently_viewed/get_products?user_id=' + user_id)
      .pipe(map(res => res.json()));
  }

  addToCart(user_id: string, product_id: number, count: number = 1) {
    return this.http.get('http://' + Constant.IP + ':3000/api/cart/add_to_cart?user_id=' + user_id + '&product_id=' + product_id + '&count=' + count)
      .pipe(map(res => res.json()));
  }


  addToWishList(user_id: string, product_id: number) {
    return this.http.get('http://' + Constant.IP + ':3000/api/wishlist/add_to_wishlist?user_id=' + user_id + '&product_id=' + product_id)
      .pipe(map(res => res.json()));
  }

}

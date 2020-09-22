import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Constant} from './constant';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: Http) {
  }

  addToCart(user_id: string, product_id: string, count: number) {
    return this.http.get('http://' + Constant.IP + ':3000/api/cart/add_to_cart?user_id=' + user_id + '&product_id=' + product_id + '&count=' + count)
      .pipe(map(res => res.json()));
  }

  getProductsInCart(user_id: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/cart/get_cart_products?user_id=' + user_id)
      .pipe(map(res => res.json()));
  }

  deleteProductFromCart(user_id: string, product_id: string) {
    return this.http.delete('http://' + Constant.IP + ':3000/api/cart/remove_product?user_id=' + user_id + '&product_id=' + product_id)
      .pipe(map(res => res.json()));
  }
}

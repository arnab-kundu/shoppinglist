import {Injectable} from '@angular/core';
import {Constant} from "./constant";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: Http) {
  }

  getProductsInWishList(user_id: string) {
    return this.http.get('http://' + Constant.IP + ':3000/api/wishlist/get_wishlist?user_id=' + user_id)
      .pipe(map(res => res.json()));
  }

  deleteProductFromWishList(user_id: string, product_id: string) {
    return this.http.delete('http://' + Constant.IP + ':3000/api/wishlist/remove_from_wishlist?user_id=' + user_id + '&product_id=' + product_id)
      .pipe(map(res => res.json()));
  }
}

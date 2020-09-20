import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Constant} from './constant';
import {Observable} from 'rxjs/internal/Observable';
import {Item} from './models/item';


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

  getProduct(id: number) {
    return this.http.get('http://' + Constant.IP + ':3000/api/product/products?id=' + id)
      .pipe(map(res => res.json()));
  }
}

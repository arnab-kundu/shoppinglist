import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Constant} from './constant';
import {Observable} from 'rxjs/internal/Observable';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) {
  }

  getShoppingItems() {
    return this.http.get('http://' + Constant.IP + ':3000/api/item/items')
      .pipe(map(res => res.json()));
  }

  addShoppingItem(newItem): Observable<Item> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + Constant.IP + ':3000/api/item/add_item', newItem, {headers: headers})
      .pipe(map(res => res.json()));
  }

  deleteShopping(id) {
    return this.http.delete('http://' + Constant.IP + ':3000/api/item/?id=' + id, null)
      .pipe(map(res => res.json()));
  }

  updateShoppingItem(newItem): Observable<Item> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://' + Constant.IP + ':3000/api/item/?id=' + newItem.id, newItem, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

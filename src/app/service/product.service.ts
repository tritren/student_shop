import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IProduct, IUpdateProduct } from '../models/product.model';

@Injectable()
export class ProductService {

  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }

  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + '/api/Product');
  }
  getProductByCategoryId(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + `/api/Product/${id}`)
      .pipe(
        map(resp => {
          resp.forEach(v => {
            v.itemPrice = v.price;
            v.bought = 1
          })
          return resp
        }));
  }

  updateProductById(id: number, val: IUpdateProduct): Observable<any> {
    return this.http.put<any>(this.url + `/api/Product/${id}`, val);
  }
}

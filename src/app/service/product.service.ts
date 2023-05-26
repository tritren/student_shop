import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.model';

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
          resp.forEach(v => v.bought = 1)
          return resp
        }));
  }

}

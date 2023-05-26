import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.medel';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }

  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + '/api/Product');
  }

}

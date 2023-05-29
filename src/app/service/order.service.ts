import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/order.model';
import { IUpdateProduct } from '../models/product.model';

@Injectable()
export class OrderService {

  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }


  createOrder(params: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/Order', params);
  }

  getCustomerOrderById(id: number): Observable<any> {
    return this.http.get<any>(this.url + `/api/Order?customerID=${id}`);
  }



}

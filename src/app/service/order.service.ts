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


  createOrder(params: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.url + '/api/Order', params);
  }

  getCustomerOrderById(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.url + `/api/Order?customerID=${id}`);
  }


  getWorkerOrderById(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.url + `/api/Order?worderID=${id}`);
  }

  changeStatusOrder(order: IOrder): Observable<any> {
    return this.http.put(this.url + `/api/Order/${order.id}/status?status=${order.status}`, { status: order.status });
  }


  // http://localhost:5175/api/Order?worderID=3
}

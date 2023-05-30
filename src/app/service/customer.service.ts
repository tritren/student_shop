import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../models/customer.model';


@Injectable()
export class CustomerService {
  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }

  getCustomerList(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.url + '/api/Customer');
  }

}

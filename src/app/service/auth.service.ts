import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegUserModel } from '../models/reg-user.model';
import { ICustomer, IRoleResponse } from '../models/customer.model';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = environment.appUrl;

  constructor(
    private http: HttpClient,
  ) { }


  registrationCustomer(customer: ICustomer): Observable<IRoleResponse> {
    return this.http.post<IRoleResponse>(this.apiUrl + '/api/Customer', customer);
  }


  authorizationUser(user: IRegUserModel): Observable<IRoleResponse> {
    return this.http.post<IRoleResponse>(this.apiUrl + '/api/Auth', user);
  }

}

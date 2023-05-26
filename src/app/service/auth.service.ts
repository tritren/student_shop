import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { IRegUserModel } from '../models/reg-user.model';
import { ICustomer, IRoleResponse } from '../models/customer.model';
// import { IReqModel } from '../models/req-model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.appUrl;
  // private cookieServiceDomain = environment.cookieService.domain;

  // private HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
  // private userIsLoggedIn = new BehaviorSubject<boolean>(false);
  // public userIsLoggedIn$ = this.userIsLoggedIn.asObservable();

  // public user = new BehaviorSubject<any>({});
  // public user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelperService: JwtHelperService,
  ) {
  }


  registrationCustomer(customer: ICustomer): Observable<IRoleResponse> {
    return this.http.post<IRoleResponse>(this.apiUrl + '/api/Customer', customer);
  }


  authorizationUser(user: IRegUserModel): Observable<IRoleResponse> {
    return this.http.post<IRoleResponse>(this.apiUrl + '/api/Auth', user);
  }

}

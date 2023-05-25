import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { CookieService } from 'ngx-cookie-service';
// import { environment } from 'src/environments/environment';
import { IRegUserModel } from '../models/reg-user.medel';
// import { IReqModel } from '../models/req-model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private apiUrl = environment.apiServerUrl;
  // private cookieServiceDomain = environment.cookieService.domain;

  // private HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
  // private userIsLoggedIn = new BehaviorSubject<boolean>(false);
  // public userIsLoggedIn$ = this.userIsLoggedIn.asObservable();

  // public user = new BehaviorSubject<any>({});
  // public user$ = this.user.asObservable();

  // constructor(
  //   private http: HttpClient,
  //   // private cookieService: CookieService,
  //   // private jwtHelperService: JwtHelperService,
  // ) { }


  // /**
  //  * Регистрация пользователя
  //  * @param user
  //  */
  // public registerUser(user: IRegUserModel): Observable<IReqModel> {
  //   return this.http.post<IReqModel>(this.apiUrl + '/auth/registration', user, { headers: this.HEADERS, withCredentials: true })
  // }

  // /**
  //  * Авторизация пользователя
  //  * @param user
  //  */
  // public login(user: IRegUserModel): Observable<IReqModel> {
  //   return this.http.post<IReqModel>(this.apiUrl + '/auth/login', user, { headers: this.HEADERS, withCredentials: true })
  // }


  // /**
  //  * проверяем
  //  * авторизован пользователь или нет
  //  * @returns
  //  */
  // public isLoggedIn(): boolean {
  //   const token = this.cookieService.get('access_token');
  //   return token != null && !this.jwtHelperService.isTokenExpired(token);
  // }


  // /**
  //  * выходим из приложения
  //  */
  // public logOut(): boolean {
  //   this.cookieService.delete('access_token', '/', this.cookieServiceDomain);
  //   return this.cookieService.check('access_token');
  // }

  // /**
  //  * обновляем значение переменной
  //  * залогинен пользователь или нет
  //  */
  // public updatedUserIsLoggedIn(data: boolean) {
  //   this.userIsLoggedIn.next(data)
  // }
}

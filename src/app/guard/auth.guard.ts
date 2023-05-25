import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
// import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../service/auth.service";
import { IAuthModel } from "../models/auth.model";


@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    // private jwtHelperService: JwtHelperService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const cookie: string = this.cookieService.get('access_token')
    // const encodingJwt = this.jwtHelperService.decodeToken(cookie) as IAuthModel;

    const roles: string = route.data["roles"];

    return true
    // if (this.authService.isLoggedIn() && encodingJwt.roles.find(j => j.value == roles)) {
    //   this.authService.user.next(encodingJwt?.id);
    //   this.authService.updatedUserIsLoggedIn(true);
    //   return true;
    // } else {
    //   this.authService.updatedUserIsLoggedIn(false);
    //   this.router.navigate(['admin/auth'])
    //   return false;
    // }
  }
}

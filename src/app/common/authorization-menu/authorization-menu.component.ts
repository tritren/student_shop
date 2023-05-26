import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IRoleResponse } from 'src/app/models/customer.model';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-authorization-menu',
  templateUrl: './authorization-menu.component.html',
  styleUrls: ['./authorization-menu.component.less'],
  providers: [CookieService]
})
export class AuthorizationMenuComponent {

  inSystem$: Observable<IRoleResponse | null> = this.stateUserService.getUserRole();

  userRole: any

  constructor(
    public cookieService: CookieService,
    public stateUserService: StateUserService,
  ) {
    if (this.cookieService.get('token')) {
      this.stateUserService.setUserRole(JSON.parse(this.cookieService.get('token')));
    }
  }

  logOut() {
    this.cookieService.delete('token');
    this.stateUserService.setUserRole(null);
  }
}

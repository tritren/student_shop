import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IRoleResponse } from 'src/app/models/customer.model';
import { IProduct } from 'src/app/models/product.model';
import { StorageForCartItemService } from 'src/app/service/local-storage-cart.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-authorization-menu',
  templateUrl: './authorization-menu.component.html',
  styleUrls: ['./authorization-menu.component.less'],
  providers: [CookieService]
})
export class AuthorizationMenuComponent {

  inSystem$: Observable<IRoleResponse | null> = this.stateUserService.getUserRole();
  productFromStore$: Observable<IProduct[]> = this.storageForCartItemService.getProductList();

  userRole: any

  constructor(
    public cookieService: CookieService,
    public stateUserService: StateUserService,
    public route: Router,
    public storageForCartItemService: StorageForCartItemService,
  ) {
    if (this.cookieService.get('token')) {
      this.stateUserService.setUserRole(JSON.parse(this.cookieService.get('token')));
    }
    if (this.storageForCartItemService.getItem())
      this.storageForCartItemService.setProductList(JSON.stringify(this.storageForCartItemService.getItem()))
  }

  logOut() {
    this.cookieService.delete('token');
    this.stateUserService.setUserRole(null);
    this.route.navigate(['/'])
  }
}

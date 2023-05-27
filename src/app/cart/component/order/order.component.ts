import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [OrderService]
})
export class OrderComponent {

  private userId$ = this.stateUserService.getUserRole().pipe(map(v => v?.id));

  public orderList$ = this.userId$.pipe(
    switchMap((id) => id ? this.orderService.getCustomerOrderById(id) : [])
  );

  constructor(
    private orderService: OrderService,
    private stateUserService: StateUserService,
  ) { }

}

import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { OrderStatusEnum } from 'src/app/enum/order-status.enum';
import { OrderService } from 'src/app/service/order.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.less'],
  providers: [OrderService]
})
export class HistoryOrderComponent {

  public statusEnum: typeof OrderStatusEnum = OrderStatusEnum;
  private userId$ = this.stateUserService.getUserRole().pipe(map(v => v?.id));
  public orderList$ = this.userId$.pipe(
    switchMap((id) => id ? this.orderService.getCustomerOrderById(id) : []),
    map(v => {
      return v.filter(k => k.status == this.statusEnum.Done)
    })
  );

  constructor(
    private orderService: OrderService,
    private stateUserService: StateUserService,
  ) {
  }
}

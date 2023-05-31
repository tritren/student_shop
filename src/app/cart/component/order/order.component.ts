import { Component } from '@angular/core';
import { filter, map, switchMap } from 'rxjs';
import { OrderStatusEnum } from 'src/app/enum/order-status.enum';
import { OrderService } from 'src/app/service/order.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [OrderService]
})
export class OrderComponent {
  public filter = {
    filterMultiple: true,
    listOfFilter: [
      { text: 'В ожидании', value: 'Awaiting' },
      { text: 'В обработке', value: 'InProcess' },
      { text: 'В пути', value: 'Delivering' },
    ],
    filterFn: (list: string[], item: any) => list.some(name => item.status.indexOf(name) !== -1)
  }
  public statusEnum: typeof OrderStatusEnum = OrderStatusEnum;
  private userId$ = this.stateUserService.getUserRole().pipe(map(v => v?.id));
  public orderList$ = this.userId$.pipe(
    switchMap((id) => id ? this.orderService.getCustomerOrderById(id) : []),
    map(v => {
      return v.filter(k => k.status !== this.statusEnum.Done)
    })
  );

  constructor(
    private orderService: OrderService,
    private stateUserService: StateUserService,
  ) {
  }

}

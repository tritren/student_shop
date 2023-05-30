import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { OrderStatusEnum } from 'src/app/enum/order-status.enum';
import { IRoleResponse } from 'src/app/models/customer.model';
import { IOrder } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/order.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.less'],
  providers: [OrderService]

})
export class WorkerComponent extends BaseDestroyableComponent {
  public statusEnum: typeof OrderStatusEnum = OrderStatusEnum;
  private inSystem$: Observable<IRoleResponse | null> = this.stateUserService.getUserRole();
  public ordersList$!: Observable<IOrder[]>;

  public filter = {
    filterMultiple: true,
    listOfFilter: [
      { text: 'В обработке', value: 'InProcess' },
      { text: 'В пути', value: 'Delivering' },
    ],
    filterFn: (list: string[], item: any) => list.some(name => item.status.indexOf(name) !== -1)
  }

  constructor(
    public orderService: OrderService,
    public stateUserService: StateUserService,
    private message: NzMessageService
  ) {
    super();
    this.getOrderList();
  }

  getOrderList() {
    this.ordersList$ = this.inSystem$.pipe(switchMap((v) => v ? this.orderService.getWorkerOrderById(v.id) : []))
  }

  changeStatusOrder(order: IOrder) {
    this.orderService.changeStatusOrder(order)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => {
        this.message.success(`Статус заказа №${order.id} успешно изменен.`)
      })
  }
}

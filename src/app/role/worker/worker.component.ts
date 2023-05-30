import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { OrderStatusEnum } from 'src/app/enum/order-status.enum';
import { IOrder } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.less'],
  providers: [OrderService]

})
export class WorkerComponent extends BaseDestroyableComponent {
  public statusEnum: typeof OrderStatusEnum = OrderStatusEnum;
  //dsdsds

  public ordersList$!: Observable<IOrder[]>;

  public filter = {
    filterMultiple: true,
    listOfFilter: [
      { text: 'В ожидании', value: 'Awaiting' },
      { text: 'В обработке', value: 'InProcess' },
      { text: 'В пути', value: 'Delivering' },
      { text: 'Доставлен', value: 'Done' },
    ],
    filterFn: (list: string[], item: any) => list.some(name => item.status.indexOf(name) !== -1)
  }

  constructor(
    public orderService: OrderService,
    private message: NzMessageService
  ) {
    super();
    this.getOrderList();
  }

  getOrderList() {
    this.ordersList$ = this.orderService.getWorkerOrderById(3)
  }

  changeStatusOrder(order: IOrder) {
    this.orderService.changeStatusOrder(order)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => {
        this.getOrderList();
        this.message.success(`Статус заказа №${order.id} успешно изменен.`)
      })
  }
}

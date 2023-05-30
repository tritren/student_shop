import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, switchMap, takeUntil, tap } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { OrderStatusEnum } from 'src/app/enum/order-status.enum';
import { IRoleResponse } from 'src/app/models/customer.model';
import { IOrder } from 'src/app/models/order.model';
import { IWorker } from 'src/app/models/worker.model';
import { OrderService } from 'src/app/service/order.service';
import { StateUserService } from 'src/app/service/state.auth.service';
import { WorkerService } from 'src/app/service/worker.service';

@Component({
  selector: 'app-manager-order',
  templateUrl: './manager-order.component.html',
  styleUrls: ['./manager-order.component.less'],
  providers: [OrderService, WorkerService]
})
export class ManagerOrderComponent extends BaseDestroyableComponent {
  public statusEnum: typeof OrderStatusEnum = OrderStatusEnum;
  private inSystem$: Observable<IRoleResponse | null> = this.stateUserService.getUserRole();
  public ordersList$!: Observable<IOrder[]>;
  public workerList: IWorker[] = [];
  public filter = {
    filterMultiple: true,
    listOfFilter: [
      { text: 'В ожидании', value: 'Awaiting' },
      { text: 'В обработке', value: 'InProcess' },
      { text: 'В пути', value: 'Delivering' },
      { text: 'Выполнен', value: 'Done' },

    ],
    filterFn: (list: string[], item: any) => list.some(name => {
      return item.status && item.status.length > 0 ? item.status.indexOf(name) !== -1 : '';
    })
  }

  constructor(
    public orderService: OrderService,
    public workerService: WorkerService,
    public stateUserService: StateUserService,
    private message: NzMessageService
  ) {
    super();
    this.getOrderList();
    this.getWorkerList()
  }

  getOrderList() {
    this.ordersList$ = this.orderService.getAllOrder()
  }

  getWorkerList() {
    this.workerService.getWorkerList()
      .pipe(
        tap((v: IWorker[]) => this.workerList = v),
        takeUntil(this.subscriptions)
      )
      .subscribe()
  }

  setWorker(order: IOrder) {
    const workerFullName = this.workerList.filter(v => v.id == order.workerID).map(v => v.fullName);
    this.orderService.changeWorkerOrder(order)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => {
        this.message.success(`Сотрудник ${workerFullName} назначен на заказ №${order.id}.`)
      })
  }


  changeStatusOrder(order: IOrder) {
    this.orderService.changeStatusOrder(order)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => {
        this.message.success(`Статус заказа №${order.id} успешно изменен.`)
      })
  }
}

import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil, tap } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { OrderStatusEnum } from 'src/app/enum/order-status.enum';
import { ICustomer } from 'src/app/models/customer.model';
import { IOrder } from 'src/app/models/order.model';
import { IProduct } from 'src/app/models/product.model';
import { IWorker } from 'src/app/models/worker.model';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { WorkerService } from 'src/app/service/worker.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [OrderService, CustomerService, WorkerService, ProductService]
})
export class OrderComponent extends BaseDestroyableComponent {
  public isVisible = false;
  orderList$!: Observable<IOrder[]>
  customerList$: Observable<ICustomer[]> = this.customerService.getCustomerList();
  public workerList: IWorker[] = [];
  public productList: IProduct[] = [];
  public itemsList: any[] = [];
  orderProductList: IProduct[] = []
  selectedProduct!: IProduct;
  public orderForm!: UntypedFormGroup
  listOfSelectedValue = [8];
  public statusEnum: typeof OrderStatusEnum = OrderStatusEnum;
  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private workerService: WorkerService,
    private fb: UntypedFormBuilder
  ) {
    super();
    this.getAllOrder();
    this.getWorkerList()
    this.getProduct()
  }


  getAllOrder() {
    this.orderList$ = this.orderService.getAllOrder();
  }

  getWorkerList() {
    this.workerService.getWorkerList()
      .pipe(
        tap((v: IWorker[]) => this.workerList = v),
        takeUntil(this.subscriptions)
      )
      .subscribe()
  }

  findWorker(id: number): string {
    return this.workerList.filter(v => v.id == id).map(v => v.fullName)[0]
  }

  editOrder(data: IOrder) {
    this.itemsList = [];
    this.isVisible = !this.isVisible;
    this.orderProductList = [];
    data.items.forEach((v: any) => {
      if (this.productList.some(k => k.id == v.itemID)) {
        this.itemsList.push(this.productList.find(j => j.id == v.itemID))
      }
    })

    this.orderForm = this.fb.group({
      id: [data.id, [Validators.required]],
      customerID: [data.customerID],
      managerID: [data.managerID],
      workerID: [data.workerID],
      addressFrom: [data.addressFrom],
      addressTo: [data.addressTo],
      status: [data.status],
      description: [data.description],
      items: [this.itemsList, [Validators.required]],
    })
  }

  getProduct() {
    this.productService.getProduct()
      .pipe(takeUntil(this.subscriptions))
      .subscribe((v: IProduct[]) => this.productList = v);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  selectProduct(item: any) {
    this.orderForm.get('items')?.patchValue([...this.orderForm.get('items')?.value, item])
  }

  removeItems(item: IProduct) {
    let items = this.orderForm.get('items')?.value;
    const index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1);
    }
    this.orderForm.get('items')?.patchValue([...items]);


  }
  confirmationEdit() {
    if (this.orderForm.valid) {
      let body: any = { ...this.orderForm.value };
      let itemList = body.items.map((v: any) => v = { itemID: v.id, price: v.price });
      body.items = [...itemList]
      this.orderService.updateWorkerOrder(body)
        .pipe(takeUntil(this.subscriptions))
        .subscribe(() => {
          this.isVisible = false;
          this.getAllOrder()
        })
    }
  }
}

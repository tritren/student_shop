import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { ICustomer } from 'src/app/models/customer.model';
import { IOrder } from 'src/app/models/order.model';
import { IProduct, IUpdateProduct } from 'src/app/models/product.model';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-manager-create-order',
  templateUrl: './manager-create-order.component.html',
  styleUrls: ['./manager-create-order.component.less'],
  providers: [CustomerService, ProductService, OrderService]
})

export class ManagerCreateOrderComponent extends BaseDestroyableComponent {

  public orderForm!: UntypedFormGroup;
  public customerList: ICustomer[] = [];
  public productList: IProduct[] = [];
  private purchasedItems!: any;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: UntypedFormBuilder,
    private message: NzMessageService
  ) {
    super();
    this.initForm();
    this.getCustomer();
    this.getProduct();


    this.orderForm.valueChanges.subscribe(v => {
      console.log(v);

    })
  }

  initForm() {
    this.orderForm = this.fb.group({
      customerID: [null, [Validators.required]],
      managerID: [0],
      workerID: [0],
      status: ['Awaiting', [Validators.required]],
      addressFrom: [null, [Validators.required]],
      addressTo: [''],
      description: [null, [Validators.required]],
      items: [[], [Validators.required]],
    })
  }


  getCustomer() {
    this.customerService.getCustomerList()
      .pipe(takeUntil(this.subscriptions))
      .subscribe((v: ICustomer[]) => this.customerList = v);
  }
  getProduct() {
    this.productService.getProduct()
      .pipe(takeUntil(this.subscriptions))
      .subscribe((v: IProduct[]) => this.productList = v.filter(v => v.count != 0));
  }

  createOrder() {
    if (this.orderForm.valid) {
      this.orderForm.controls['items'].value
        .map((v: IProduct) => [...Array(v.price / v.itemPrice)].map(x => x = { itemID: v.id, price: v.itemPrice }))
        .flat(1)

      this.purchasedItems = this.orderForm.controls['items'].value.map((v: IProduct) => [...Array(v.price / v.itemPrice)]
        .map(x => x = {
          itemID: v.id,
          price: v.itemPrice,
          description: v.description,
          name: v.name,
          categoryID: v.categoryID,
          count: v.count
        }));

      this.orderService.createOrder(this.orderForm.value)
        .pipe(takeUntil(this.subscriptions))
        .subscribe((v: IOrder) => {
          if (v) {
            this.changeQuantityCountItem();
            this.message.success(`Заказ с №${v.id} успешно создан.`)
            this.initForm();
          }
        })
    }
  }

  changeQuantityCountItem() {
    const itemCount = this.purchasedItems
    for (let i = 0; i < itemCount.length; i++) {
      let item = itemCount[i][0];
      const body = {
        categoryID: item.categoryID,
        name: item.name,
        price: item.price,
        count: item.count - itemCount[i].length,
        description: item.description
      } as IUpdateProduct;

      this.productService.updateProductById(item.itemID, body)
        .pipe(takeUntil(this.subscriptions))
        .subscribe();
    }
  }

  count(item: IProduct) {
    item.price = item.itemPrice * item.bought;
  }

}

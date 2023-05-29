import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';

import { IProduct } from 'src/app/models/product.model';
import { StorageForCartItemService } from 'src/app/service/local-storage-cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less'],
  providers: [ProductService, OrderService]
})
export class CartListComponent extends BaseDestroyableComponent {

  public isVisibleModal: boolean = false;
  public finalByItem!: IProduct;
  public orderForm!: UntypedFormGroup;
  public userId: number | null = null;
  public orderSum!: number;


  public productFromStore$: Observable<IProduct[]> = this.storageForCartItemService.getProductList();

  constructor(
    private fb: UntypedFormBuilder,
    private stateUserService: StateUserService,
    private orderService: OrderService,
    private router: Router,
    private storageForCartItemService: StorageForCartItemService
  ) {
    super()
    this.stateUserService.getUserRole()
      .pipe(takeUntil(this.subscriptions))
      .subscribe((v: any) => this.userId = v?.id)
  }

  handleCancel() {
    this.isVisibleModal = false;
  }

  placeOrder(val: IProduct[]) {
    this.isVisibleModal = !this.isVisibleModal;
    let itemList = val.map((v: IProduct) => v = { itemID: v.id, price: v.price } as any);
    this.orderSum = itemList.reduce((acc, curVal) => acc + curVal.price, 0);
    this.orderForm = this.fb.group({
      customerID: [this.userId, [Validators.required]],
      managerID: [0],
      workerID: [0],
      addressFrom: ['',],
      addressTo: [null, [Validators.required]],
      description: ['',],
      items: [itemList, [Validators.required]],
    })
  }

  public submit(): void {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value)
        .pipe(takeUntil(this.subscriptions))
        .subscribe(resp => {
          if (resp) {
            this.handleCancel();
            this.storageForCartItemService.removeAllItem();
            this.router.navigate(['/cart-list/order'])
          }
        })
    }
  }
}

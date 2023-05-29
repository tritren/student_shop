import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { IRoleResponse } from 'src/app/models/customer.model';
import { IOrder } from 'src/app/models/order.model';
import { IProduct } from 'src/app/models/product.model';
import { LocalStorageForCartItemService } from 'src/app/service/local-storage-cart.service';
import { OrderService } from 'src/app/service/order.service';

import { ProductService } from 'src/app/service/product.service';
import { StateUserService } from 'src/app/service/state.auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.less'],
  providers: [ProductService, OrderService, LocalStorageForCartItemService]
})
export class ProductComponent extends BaseDestroyableComponent {

  public orderForm!: UntypedFormGroup;
  public category!: string;
  public demoValue: number = 1;
  public isVisibleModal: boolean = false;
  public finalByItem!: IProduct;
  public userId: number | null = null;

  private category$ = this.route.queryParams
    .pipe(
      tap(v => this.category = v?.['category']),
      map(v => v?.['id'])
    );

  public productList$ = this.category$.pipe(switchMap((id) => this.productService.getProductByCategoryId(id)));

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private stateUserService: StateUserService,
    private productService: ProductService,
    private localCartStorService: LocalStorageForCartItemService,
    private orderService: OrderService,
    private router: Router,
  ) {
    super();
    this.stateUserService.getUserRole()
      .pipe(takeUntil(this.subscriptions))
      .subscribe((v: any) => this.userId = v?.id)
  }


  handleCancel() {
    this.isVisibleModal = false;
  }

  public submit(): void {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value)
        .pipe(takeUntil(this.subscriptions))
        .subscribe(resp => {
          if (resp) {
            this.handleCancel();
            this.router.navigate(['/cart/order'])
          }
        })
    }
  }

  buyItem(item: IProduct) {
    this.localCartStorService.addItem(item)


    // const itemFromStore = localStorage.getItem('cart-list');
    // if (!itemFromStore) {
    //   localStorage.setItem('cart-list', JSON.stringify(item))
    // } else {

    // }

    // this.isVisibleModal = !this.isVisibleModal;
    // this.finalByItem = { ...item, price: item?.bought ? (item.price * item?.bought) : item.price }
    // this.initForm(this.finalByItem);

  }


  //   initForm(val: IProduct) {

  //     this.orderForm = this.fb.group({
  //       customerID: [this.userId, [Validators.required]],
  //       managerID: [0],
  //       workerID: [0],
  //       addressFrom: ['',],
  //       addressTo: [null, [Validators.required]],
  //       description: [val.description, [Validators.required]],
  //       items: [[
  //         { itemID: val.id, price: val.price }
  //       ], [Validators.required]],
  //     })
  //   }



}

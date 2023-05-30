import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, map, switchMap, takeUntil, tap } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { IRoleResponse } from 'src/app/models/customer.model';
import { IProduct } from 'src/app/models/product.model';
import { StorageForCartItemService } from 'src/app/service/local-storage-cart.service';
import { ProductService } from 'src/app/service/product.service';
import { StateUserService } from 'src/app/service/state.auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.less'],
  providers: [ProductService]
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

  inSystem$: Observable<IRoleResponse | null> = this.stateUserService.getUserRole();
  public productList$ = this.category$.pipe(switchMap((id) => this.productService.getProductByCategoryId(id)));

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private localCartStorService: StorageForCartItemService,
    public stateUserService: StateUserService,
    private message: NzMessageService
  ) { super() }

  count(item: IProduct) {
    item.price = item.itemPrice * item.bought;
  }

  buyItem(item: IProduct, val: any = null) {
    this.inSystem$.pipe(takeUntil(this.subscriptions))
      .subscribe(v => {
        if (v && item) {
          if (this.localCartStorService.addItem(item)) {
            this.message.success(`${item.description} добавлен в корзину!`);
          }
        } else {
          this.message.info(`Пожалуиста авторизуйтесь!`);
        }
      })
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderComponent } from './component/order/order.component';
import { HistoryOrderComponent } from './component/history-order/history-order.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CartListComponent } from './component/cart-list/cart-list.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PipesModule } from '../pipe/order-sum-pipe.module';

@NgModule({
  declarations: [
    CartComponent,
    OrderComponent,
    HistoryOrderComponent,
    CartListComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    //NG_ZORRO
    NzTableModule,
    NzDividerModule,
    NzEmptyModule,
    NzButtonModule,
    NzGridModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzIconModule,
    NzToolTipModule
  ]
})
export class CartModule { }

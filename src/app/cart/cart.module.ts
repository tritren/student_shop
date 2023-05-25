import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderComponent } from './component/order/order.component';
import { HistoryOrderComponent } from './component/history-order/history-order.component';


@NgModule({
  declarations: [
    CartComponent,
    OrderComponent,
    HistoryOrderComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }

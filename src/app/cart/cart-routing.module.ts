import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { OrderComponent } from './component/order/order.component';
import { HistoryOrderComponent } from './component/history-order/history-order.component';
import { CartListComponent } from './component/cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '', component: CartComponent, children: [
      { path: '', redirectTo: 'cart-list', pathMatch: "full" },
      { path: 'cart-list', pathMatch: 'full', component: CartListComponent },
      { path: 'order', component: OrderComponent },
      { path: 'history-order', component: HistoryOrderComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

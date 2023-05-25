import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { OrderComponent } from './component/order/order.component';
import { HistoryOrderComponent } from './component/history-order/history-order.component';

const routes: Routes = [
  {
    path: '', component: CartComponent, children: [
      { path: '', redirectTo: 'order', pathMatch: "full" },
      { path: 'order', pathMatch: 'full', component: OrderComponent },
      { path: 'history-order', component: HistoryOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

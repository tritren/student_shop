import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManagerComponent } from './component/manager/manager.component';
import { WorkerComponent } from './component/worker/worker.component';
import { CustomerComponent } from './component/customer/customer.component';
import { OrderComponent } from './component/order/order.component';
import { ProductComponent } from './component/product/product.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'manager', pathMatch: "full" },
      { path: 'manager', pathMatch: 'full', component: ManagerComponent },
      { path: 'worker', component: WorkerComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'order', component: OrderComponent },
      { path: 'product', component: ProductComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryOrderComponent } from './cart/component/history-order/history-order.component';
import { WorkerComponent } from './role/worker/worker.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'authorization', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: 'cart-list', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'Worker', loadChildren: () => import('./role/worker/worker.module').then(m => m.WorkerModule) }
  // { path: 'Worker', component: WorkerComponent },
  // { path: 'Manager', component: HistoryOrderComponent },
  // { path: 'Admin', component: HistoryOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'authorization', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: 'cart-list', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'Worker', loadChildren: () => import('./role/worker/worker.module').then(m => m.WorkerModule) },
  { path: 'Manager', loadChildren: () => import('./role/manager/manager.module').then(m => m.ManagerModule) }

  // { path: 'Admin', component: HistoryOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

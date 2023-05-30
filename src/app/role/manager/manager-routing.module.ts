import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ManagerOrderComponent } from './component/manager-order/manager-order.component';
import { ManagerCreateOrderComponent } from './component/manager-create-order/manager-create-order.component';

const routes: Routes = [
  {
    path: '', component: ManagerComponent, children: [
      { path: '', redirectTo: 'manager-order', pathMatch: "full" },
      { path: 'manager-order', pathMatch: 'full', component: ManagerOrderComponent },
      { path: 'manager-create-order', component: ManagerCreateOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }

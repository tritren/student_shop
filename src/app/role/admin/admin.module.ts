import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManagerComponent } from './component/manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkerComponent } from './component/worker/worker.component';
import { CustomerComponent } from './component/customer/customer.component';
import { ProductComponent } from './component/product/product.component';
import { OrderComponent } from './component/order/order.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    AdminComponent,
    ManagerComponent,
    WorkerComponent,
    CustomerComponent,
    ProductComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NzTableModule,
    NzEmptyModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzModalModule,
    NzToolTipModule,
    NzMessageModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzRadioModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ManagerCreateOrderComponent } from './component/manager-create-order/manager-create-order.component';
import { ManagerOrderComponent } from './component/manager-order/manager-order.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { OrderSumPipe } from 'src/app/pipe/order-sum.pipe';

@NgModule({
  declarations: [
    ManagerComponent,
    ManagerCreateOrderComponent,
    ManagerOrderComponent,
    OrderSumPipe,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //NG-ZORRO
    NzTableModule,
    NzEmptyModule,
    NzButtonModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzRadioModule,
    NzMessageModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzFormModule
  ]
})
export class ManagerModule { }

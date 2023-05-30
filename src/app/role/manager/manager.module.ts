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
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    ManagerComponent,
    ManagerCreateOrderComponent,
    ManagerOrderComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    //NG-ZORRO
    NzTableModule,
    NzEmptyModule,
    NzButtonModule,
    NzPopoverModule,
    NzRadioModule,
    NzMessageModule,
    NzSelectModule,
    NzIconModule
  ]
})
export class ManagerModule { }
